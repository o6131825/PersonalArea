import React from 'react';
import Crumbs from '../crumbs/crumbs'
import Contact from '../contact/contact'
import logo1 from '../app-header/img/logo1.JPG';
import logo2 from '../app-header/img/03e928825d770546c76235229b401b50_753x93.jpg';
import './app-header.css';

import 'bootstrap/dist/css/bootstrap-grid.css'; 


const AppHeader = () => {
  return (
    <div>
      <div className="row">
        <div className='col '>
          <ul className="list-unsttyled logo1-page">
            <img src={logo1}></img>
          </ul>
        </div>

        <div className='col'>
          <ul className="list-unsttyled">
            <img src={logo2}></img>
          </ul>
        </div>

        <div className='col'>
          <ul className="list-unsttyled">
          <Contact />
          </ul>
        </div>
        
      </div>
      <Crumbs />
    </div>
  );
};

export default AppHeader;
