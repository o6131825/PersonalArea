import React from "react";
import ReactDOM from "react-dom";

import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { YMaps, Map, Placemark, GeolocationControl } from "react-yandex-maps";

const mapState = {
  center: [55.76, 37.64],
  zoom: 10,
  controls: []

};

class  Addorder extends React.Component {
  
    buttonclic()  {
     console.log('Что-то произошло')
    
  }

  handleSubmit(){
    console.log('Submit')
  }


  render() {
    
  return (
    <div className="container">
      <h3 className="hh3">Создание заказа</h3>

      

      <form //onSubmit={this.handleSubmit} 
        method="post" name="login">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">УНП грузополучателя</label>
          <input type="name" name="consunp"
            className="form-control" id="consunp"
            pattern="[0-9]{9}"
            aria-describedby="" placeholder="XXXXXXXXX" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Наименование грузополучателя</label>
          <input type="name" name="consname"
            className="form-control" id="consname"
            aria-describedby="" placeholder="Пример наименования" />
        </div>
        <div className="form-group">
        <label htmlFor="exampleInputEmail1">Пункт загрузки</label>
        <input type="text" list="point"
        defaultValue='Кэпитал Логистик'
        className="form-control"
        id="loadpoint"/>
 <datalist id="point">
    <option>Кэпитал Логистик</option>
 </datalist>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Адрес доставки</label>
          <input type="name" name="address"
            className="form-control" id="address"
            aria-describedby="" placeholder="Адрес" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Вес, кг</label>
          <input type="name" name="weight"
            className="form-control" id="weight"
            pattern="[0-9]{1,5}"
            aria-describedby="" placeholder="Вес, кг" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Объём, m&sup3;</label>
          <input type="name" name="weight"
            className="form-control" id="weight"
            pattern="[0-9]{1,5}"
            aria-describedby="" placeholder="Объём, m&sup3;" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Кол-во грузовых мест</label>
          <input type="name" name="cargoplaces"
            className="form-control" id="cargoplaces"
            aria-describedby="" placeholder="Кол-во грузовых мест" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Номер ТТН/Номер заказа</label>
          <input type="name" name="ttncode"
            className="form-control" id="ttncode"
            aria-describedby="" placeholder="Номер ТТН/Номер заказа" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Планируемая дата доставки</label>
          <input type="date" name="deliverydate"
            className="form-control" id="deliverydate"
            aria-describedby="" placeholder="Планируемая дата доставки" />
        </div>
        

        
        <DialogActions>
          
          <Button type="submit" color="primary">
            Создать
          </Button>
          <Button onClick={this.buttonclic} color="primary">
            Проверить
          </Button>
          
        </DialogActions>
     

      </form>
      
    </div>

);
  }
}

export default Addorder;

