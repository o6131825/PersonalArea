(function (root, factory) {
  if (!root['beltranssat'])
    root['beltranssat'] = {};
  if (!root['beltranssat']['vrp'])
    root['beltranssat']['vrp'] = {};
  factory(root['beltranssat']['vrp']);
}(this, function (exports) {
  var statusMap = {
    0: 'Заказ принят',
    10: 'Заказ принят службой доставки',
    20: 'Курьер в пути',
    30: 'Курьер прибыл',
    35: 'Заказ отложен',
    40: 'Разгрузка',
    45: 'Передача документов',
    50: 'Завершен в пути',
    60: 'Заказ доставлен',
    70: 'Отказ от заказа'
  };
  var refreshTimeOut = 10000; // every 10 sec
  var fullRefreshCount = Math.round(60000 / refreshTimeOut); // every 60 sec

  function LeafletService(mapDiv, callback) {
    L.RotatedMarker = L.Marker.extend({
      options: { angle: 0 },
      _setPos: function(pos) {
        L.Marker.prototype._setPos.call(this, pos);
        if (L.DomUtil.TRANSFORM) {
          this._icon.style[L.DomUtil.TRANSFORM] = this._icon.style[L.DomUtil.TRANSFORM].replace(/( rotate\()\d+(deg\))$/, '');
          this._icon.style[L.DomUtil.TRANSFORM] += ' rotate(' + this.options.angle + 'deg)';
          this._icon.style.transformOrigin = '50% 50%';
        } else if (L.Browser.ie) {
          var rad = this.options.angle * L.LatLng.DEG_TO_RAD,
            costheta = Math.cos(rad),
            sintheta = Math.sin(rad);
          this._icon.style.filter += ' progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\'auto expand\', M11=' +
            costheta + ', M12=' + (-sintheta) + ', M21=' + sintheta + ', M22=' + costheta + ')';
        }
      },

      setAngle: function(angle) {
        this.options.angle = parseFloat(angle);
        this._setPos(this.getLatLng());
      }
    });

    L.rotatedMarker = function(pos, options) {
      return new L.RotatedMarker(pos, options);
    };

    this.map = null;
    this.focusedOnPoint = false;
    this.rawVehiclePosition = null;
    this.rawPointPosition = null;
    this.vehiclePosition = null;
    this.pointPosition = null;
    this.messageTimeout = null;
    this.messageDiv = null;
    this.constantLabelDiv = null;
    this.init(mapDiv, callback);
  }

  LeafletService.prototype.init = function (mapDiv, callback) {
    var self = this;

    var copyrightLabel = L.Control.extend({
      options: {
        position: 'bottomleft'
      },
      onAdd: function (map) {
        return $('<a href="https://beltranssat.by" target="_blank" class="bts-logo" aria-label="БелТрансСпутник"><img src="https://images.nav.by/img/cdn/system/telematics_report/logo.png" style="width: 86px; cursor: pointer;" alt="БелТрансСпутник"></a>')[0];
      }
    });

    var logoLabel = L.Control.extend({
      options: {
        position: 'topleft'
      },
      onAdd: function (map) {
        return $('<a class="logo"><img src="' + this.options.url + '"></a>')[0];
      }
    });

    var constantLabel = L.Control.extend({
      options: {
        position: 'bottomleft'
      },
      onAdd: function (map) {
        return L.DomUtil.create('div', 'my-custom-counters');
      },
      setContent: function (content) {
        this.getContainer().innerHTML = content;
      }
    });

    var messageLabel = L.Control.extend({
      options: {
        position: 'bottomleft'
      },
      onAdd: function (map) {
        return L.DomUtil.create('div', 'my-custom-counters-error');
      },
      setContent: function (content) {
        this.getContainer().innerHTML = content;
      }
    });

    (function () {
      var map = L.map('myMap', {zoomControl: false}).setView([53, 27], 13);
      L.control.zoom({position: 'bottomright'}).addTo(map);

      var google = new L.TileLayer(
        window.location.protocol + '//mt0.google.com/vt/&hl=ru&x={x}&y={y}&z={z}', {
          minZoom: 1,
          maxZoom: 19,
          attribution: ''
        });

      map.addLayer(google);

      self.map = map;
      self.constantLabelDiv = new constantLabel().addTo(map);
      self.messageDiv = new messageLabel().addTo(map);
      self.logo = window.logoUrl ? new logoLabel({url: window.logoUrl}).addTo(map) : null;
      new copyrightLabel().addTo(map);

      if (self.rawVehiclePosition)
        self.setVehiclePosition(self.rawVehiclePosition);
      if (self.rawPointPosition)
        self.setPointPosition(self.rawPointPosition);

      self.focus();
    })();
  };

  LeafletService.prototype.focus = function () {
    if (!this.map)
      return false;
    var zoomOptions = {paddingTopLeft: L.point(40, 70), paddingBottomRight: L.point(40, $('.leaflet-bottom').height() + 30)};
    if (this.rawVehiclePosition && this.rawPointPosition) {
      this.map.fitBounds(L.latLngBounds(L.latLng(this.rawPointPosition.latitude, this.rawPointPosition.longitude), L.latLng(this.rawVehiclePosition.latitude, this.rawVehiclePosition.longitude)), zoomOptions);
    } else if (this.rawPointPosition && !this.focusedOnPoint) {
      this.map.setView(L.latLng(this.rawPointPosition.latitude, this.rawPointPosition.longitude), 17);
      this.map.fitBounds(this.map.getBounds(), zoomOptions);
      this.focusedOnPoint = true;
    }
  };

  LeafletService.prototype.setVehiclePosition = function (rawVehiclePosition) {
    this.rawVehiclePosition = rawVehiclePosition;
    if (!this.map)
      return;
    var position = L.latLng(rawVehiclePosition.latitude, rawVehiclePosition.longitude);
    var icon = L.icon({
      iconUrl: window.carIconUrl ? window.carIconUrl : 'https://images.nav.by/img/cdn/system/vrp_cs_car.png',
      iconSize: L.point(67, 30),
      iconAnchor: L.point(33, 15)
    });
    if (this.vehiclePosition) {
      this.map.removeLayer(this.vehiclePosition);
    }
    this.vehiclePosition = L.rotatedMarker(position, {icon: icon, angle: rawVehiclePosition.speed == 0 ? 0 : rawVehiclePosition.azimuth + 90}).addTo(this.map);
  };

  LeafletService.prototype.setPointPosition = function (rawPointPosition) {
    this.rawPointPosition = rawPointPosition;
    if (!this.map)
      return;
    var icon = window.orderPinUrl ? L.icon({iconUrl: window.orderPinUrl, iconSize: L.point(29, 40), iconAnchor: L.point(15, 40)}) : new L.Icon.Default();
    var position = L.latLng(rawPointPosition.latitude, rawPointPosition.longitude);
    if (this.pointPosition)
      this.pointPosition.setLatLng(position);
    else
      this.pointPosition = L.marker(position, {icon: icon}).addTo(this.map);
  };

  LeafletService.prototype.showMessage = function (messageText) {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
    this.messageDiv.setContent('<p>' + messageText + '</p>');
    var self = this;
    this.messageTimeout = setTimeout(function () {
      self.messageDiv.setContent('');
    }, 10000);
  };

  LeafletService.prototype.setConstantLabel = function (messageText) {
    this.constantLabelDiv.setContent(messageText);
  };

  var maps = {
    google: LeafletService
  };

  function ClientService(token, mapDiv, onUpdate, mapService) {
    this.token = token;
    this.mapDiv = mapDiv;
    this.onUpdate = onUpdate;
    this.map = null;
    this.mapService = mapService;
    this.pending = false;
    this.pointData = null;
    this.finishStyle = $('<style>.my-custom-counters-inner {width: 90%;} .leaflet-bottom.leaflet-left {height: 100%;} .my-custom-counters {position: absolute;top: 50%; left: 50%; transform: translate(-50%,-50%);}</style>');
    this.vehicleData = null;
    this.autoRefresh = false;
    this.loadsCount = 0;
    this.lastUpdateTimestamp = 0;
    this.needUpdateAfterFocus = false;
    _init_CS.call(this);
  }

  function xhr() {
    if (window.XMLHttpRequest)
      return new XMLHttpRequest();
    else if (window.ActiveXObject)
      return new ActiveXObject('Microsoft.XMLHTTP');
    return null;
  }

  function _init_CS() {
    this.map = new this.mapService(this.mapDiv, function () {});
    _loadData.call(this);
    var self = this;
    setPageVisibilityListeners(function () {
      if (self.needUpdateAfterFocus) {
        self.needUpdateAfterFocus = false;
        setAutoupdate.call(self, 0);
      }
    });
  }

  function _init_cS(options) {
    if (!options['token'])
      throw 'token not specified';
    var token = options['token'];
    var mapDiv = options['mapDiv'];
    var onUpdate = function () {};
    if (options['onUpdate']) {
      if (typeof options['onUpdate'] !== 'function')
        throw 'onUpdate not function';
      onUpdate = options['onUpdate'];
    }
    if (!options['mapService'])
      throw 'mapService not specified';
    if (!maps[options['mapService']])
      throw 'mapService ' + options['mapService'] + ' not exists';
    var mapService = maps[options['mapService']];
    return new ClientService(token, mapDiv, onUpdate, mapService);
  }

  function setAutoupdate(delay) {
    var self = this;
    setTimeout(function () {
      if (isPageHidden()) {
        //console.log(new Date() + ' not visible: skip upload');
        self.needUpdateAfterFocus = true;
        return;
      }
      //console.log(new Date() + ' upload data');
      _loadData.call(self);
    }, delay);
  }

  function _loadData() {
    var self = this;
    var xhrObject = xhr();
    xhrObject.onreadystatechange = function () {
      if (xhrObject.readyState === 4) {
        self.loadsCount++;
        self.pending = false;
        if (xhrObject.status === 200) {
          _processResult.call(self, xhrObject.responseText);
        } else {
          _showMessage.call(self, 'Неизвестная ошибка');
        }
      }
    };
    xhrObject.open('GET', 'https://nav.by/info/vrp_cs.php?token=' + this.token + '&lastUpdateTimestamp=' + this.lastUpdateTimestamp + '&forceUpdatePointState=' + (self.loadsCount % fullRefreshCount == 0 ? 'true' : 'false'), true);
    xhrObject.send(null);
    this.pending = true;
  }

  function _processResult(json) {
    var self = this;
    var result = null;
    try {
      result = JSON.parse(json);
    } catch (e) {
      _showMessage.call(this, 'Ошибка при обработке данных');
      return;
    }
    switch (result.status) {
      case 'OK':
        self.lastUpdateTimestamp = result.lastUpdateTimestamp;
        if (result.point) {
          var message = '';
          this.pointData = result.point;
          this.map.setPointPosition(result.point);
          if (this.pointData.mustVisitBefore) {
            message += '<p class="status-header">Ваш заказ ' + this.pointData.mustVisitBefore + '-й в очереди</p><p class="status-desc">Когда курьер будет ехать к вам, на карте отобразится его местоположение</p>';
          } else {
            message += (this.pointData.status == 60 ? '<p style="padding-bottom: 0;"><img src="https://images.nav.by/img/cdn/system/vrp_cs_done.svg"></p><p class="status-header" style="padding-top: 2px;">' + getStatusTextRepresentation(this.pointData.status) + '</p>' : '<p class="status-header">' + getStatusTextRepresentation(this.pointData.status) + '</p>');
          }
          if (result.driver) {
            message += '<p class="driver-wrap" style="padding-bottom: 8px;">Водитель: ' + result.driver.name + '</p>';
            if (result.driver.phoneNumber) {
              message += '<p style="padding-top: 2px;"><a class="phone" href="tel:' + (result.driver && result.driver.phoneNumber && result.driver.phoneNumber.substr(0, 3) == '375' ? '+' : '') + result.driver.phoneNumber + '" aria-label="Телефон">Позвонить водителю</a></p>';
            }
          }
          if (this.pointData.status == 50 || this.pointData.status == 60 || this.pointData.status == 70) {
            this.map.rawVehiclePosition = null;
            this.finishStyle.appendTo($(document.head))
          } else {
            this.finishStyle.remove();
          }
          _setConstantLabel.call(this, '<div class="my-custom-counters-inner">' + message + '</div>');
        }
        if (result.vehicle) {
          this.vehicleData = result.vehicle;
          this.map.setVehiclePosition(result.vehicle);
        }
        this.map.focus();
        if (this.autoRefresh)
          setAutoupdate.call(self, 10000);
        break;
      case 'BAD_TOKEN':
        _showMessage.call(self, 'Неверный токен');
        break;
      case 'NOT_ALLOWED':
        _showMessage.call(self, 'Клиентский сервис запрещён');
        break;
      case 'POINT_NOT_EXISTS':
        _showMessage.call(self, 'Заказ отсутствует');
        break;
      default:
        _showMessage.call(self, 'Неизвестная ошибка');
        break;
    }
    delete result.lastUpdateTimestamp;
    this.onUpdate.call(null, result);
  }

  function getStatusTextRepresentation(status) {
    return statusMap[status] ? statusMap[status] : status;
  }

  function _showMessage(message) {
    this.map.showMessage(message);
  }

  function _setConstantLabel(message) {
    this.map.setConstantLabel(message);
  }

  function _startAutoRefresh() {
    this.autoRefresh = true;
    if (!this.pending)
      _loadData.call(this);
  }

  function _stopAutoRefresh() {
    this.autoRefresh = false;
  }

  function clientService(options) {
    return _init_cS(options);
  }

  ClientService.prototype = {
    'startAutoRefresh': function () {
      _startAutoRefresh.call(this);
      return this;
    },
    'stopAutoRefresh': function () {
      _stopAutoRefresh.call(this);
      return this;
    },
    'getVehicleData': function () {
      return this.vehicleData;
    },
    'getPointData': function () {
      return this.pointData;
    }
  };

  exports['ClientService'] = clientService;
  return clientService;
}));