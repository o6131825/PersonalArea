import React from 'react';
import Appfooter from '../app-footer';

import AppHeader from '../app-header';




import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import Monitoring from '../monitoring/monitoring';
import Home from '../home/home';
import Registration from '../registration/registration'
import Users from '../users/users'
import Orders from '../orders/orders'
import Addorders from '../addorder/addorder'
import 'bootstrap/dist/css/bootstrap-grid.css';
import './app.css';
import Addorder from '../addorder/addorder';

const App = () => {

  return (
    <Router>
      <div className="contimage">
        <div className='container'>
          <div className="todo-app">
            <div className="wcolor">
              <AppHeader />
            </div>

            <div className="wcolor  ">
              <Switch>
                
              <Route path="/addorder">
                  <Addorder className=" content-body"/>
                </Route>

              <Route path="/monitoring">
                  <Monitoring className=" content-body"/>
                </Route>
                <Route path="/registration">
                  <Registration className=" content-body"/>
                </Route>
                <Route path="/users">
                  <Users className=" content-body"/>
                </Route>
                <Route path="/orders">
                  <Orders className=" content-body"/>
                </Route>
                <Route path="/">
                  <Home className=" content-body"/>
                </Route>
              </Switch>
            </div>

            <div className=" ">
              <Appfooter className="" />
            </div>

          </div>
        </div>
      </div>
    </Router>


  );
};

export default App;
