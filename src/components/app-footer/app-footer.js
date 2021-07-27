import React from 'react';


import '../app-footer/app-footer.css';
import Yanmap from "../yanmap/yanmap";
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { Icon, InlineIcon } from '@iconify/react';
import vkIcon from '@iconify-icons/mdi/vk';
import 'bootstrap/dist/css/bootstrap.css'; 
import { Link } from 'react-router'





const Appfooter = () => {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/*colum1*/}
          <div className="col">
            <h3></h3>
            <ul className="list-unstyled">
              <Yanmap />

            </ul>
          </div>
          {/*colum1*/}
          <div className="col">
            <h3></h3>
            <ul className="list-unstyled">
              <li className="row iconky">

                <h2 className="col">
                  <a href="https://www.facebook.com/capitallogistic.by">
                    <FacebookIcon fontSize="large" color="primary" />
                  </a>
                </h2>

                <h2 className="col">
                  <a href="https://www.youtube.com/channel/UC-UvSY5tcoDbSuzz5Hxwdjw">
                    <YouTubeIcon fontSize="large" color="error" />
                  </a>
                </h2>

                <h2 className="col">
                  <a href="https://vk.com/club140748612">
                    <Icon icon={vkIcon} />
                  </a>
                </h2>
              </li>

              <li className="textright">ООО "Кэпитал Логистик" УНП 690626680.</li>
              <li className="textright">Юридический адрес: 223053, Республика Беларусь,</li>
              <li className="textright">Минская обл., Минский р-н,</li>
              <li className="textright">Боровлянский с/с, 81 – 2а, каб. 28,</li>
              <li className="textright">район д. Дроздово.</li>
              <li className="textright">Почтовый адрес: 220131, г.Минск, а/я 511.</li>

            </ul>
          </div>
          {/*colum1*/}
        </div>
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} CapitalLogistik
          </p>
        </div>
      </div>
    </div>




  );
};

export default Appfooter;
