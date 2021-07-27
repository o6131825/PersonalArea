import React from 'react';

import '../yanmap/yanmap.css';
import { YMaps, Map, Placemark } from "react-yandex-maps";





const coordinates = [
  [53.976594, 27.604614],

];

const Yanmap = () => {
  return (
    <div className="mapchip" >
      <YMaps>
        <Map
          state={{ center: [53.976494, 27.604614], zoom: 13, }}
          width='565px'
          height='250px'>
          {coordinates.map(coordinate => <Placemark geometry={coordinate} />)}
        </Map>
      </YMaps>
    </div>




  );
};

export default Yanmap;
