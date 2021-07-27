import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './home.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function handleClickContract(event) {
  <Link to="/ddvd.pdf" activeClassName=""></Link>
}
function handleClickRegistration(event) {
  <Link to="/registration" activeClassName=""></Link>
}

export default function MainPage() {



  return (

    <div className="container">
      <h3 className="hh3">Главная страница</h3>
      <Grid className="container grid" container spacing={0}>
        <Grid container item xs={12} sm={6} md={4}>
          <Card className="rooth">
            <CardActionArea href="/ddvd.pdf" onClick={handleClickContract}>
              <CardMedia
                className="media"
                image="data:image/jpeg;base64,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"
                title="Ознакомиться с договором"

              />
              <CardContent >
                <Typography gutterBottom variant="h5" component="h2">
                  Ознакомиться с договором
          </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Здесь вы можете ознакомится с договором и стать клиентом лучшей компании в мире.
          </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>

            </CardActions>
          </Card>
        </Grid>
        <Grid container item xs={12} sm={6} md={4}>
          <Card className="rooth">
            <CardActionArea href="/users" onClick={handleClickContract}>
              <CardMedia
                className="media"
                image="https://hsto.org/files/950/279/14e/95027914eace4c5faf4e74bb909127bb.jpg"
                title="Авторизация"

              />
              <CardContent >
                <Typography gutterBottom variant="h5" component="h2">
                  Авторизаваться
          </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Авторизуйтесь, чтобы получить преимущество над конкурентами.
          </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>

            </CardActions>
          </Card>
        </Grid>
        <Grid container item xs={12} sm={6} md={4}>
          <Card className="rooth">
            <CardActionArea href="/registration" onClick={handleClickRegistration}>
              <CardMedia
                className="media"
                image="https://utmagazine.ru/uploads/content/%D1%80%D0%B5%D0%B3_1_%D0%BE%D0%B1%D1%801.jpg"
                title="Регистрация"/>
              <CardContent >
                <Typography gutterBottom variant="h5" component="h2">
                Регистрация
          </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Начните с нами эффективное сотрудничество. Это первый шаг к успеху!
          </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>

            </CardActions>
          </Card>
        </Grid>
        <Grid container item xs={12} sm={6} md={4}>
          <Card className="rooth">
            <CardActionArea href="/orders" onClick={handleClickContract}>
              <CardMedia
                className="media"
                image="https://img.maryno.net/images/ed5f82eab154cc43e9c104ad4eda24d2/1b64fb51a84a9173ed23a9de75484861.png/vasha_korzina_pusta.png"
                title="Ваши заказы"
              />
              <CardContent >
                <Typography gutterBottom variant="h5" component="h2">
                Ваши заказы
          </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Здесь вы можете ознакомится с договором и стать клиентом лучшей компании в мире.
          </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
            </CardActions>
          </Card>
        </Grid>
        <Grid container item xs={12} sm={6} md={4}>
          <Card className="rooth">
            <CardActionArea href="/addorder" onClick={handleClickContract}>
              <CardMedia
                className="media"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqby3c-NOn8KNnBVGUOS37qtbugQx5P879fA&usqp=CAU"
                title="Добавить заказ"
              />
              <CardContent >
                <Typography gutterBottom variant="h5" component="h2">
                Добавить заказ
          </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Здесь вы можете Добавить заказ и стать клиентом лучшей компании в мире.
          </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
            </CardActions>
          </Card>
        </Grid>
        <Grid container item xs={12} sm={6} md={4}>
          <Card className="rooth">
            <CardActionArea href="/contract" onClick={handleClickContract}>
              <CardMedia
                className="media"
                image="data:image/jpeg;base64,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"
                title="Ознакомиться с договором"
              />
              <CardContent >
                <Typography gutterBottom variant="h5" component="h2">
                  Ознакомиться с договором
          </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Здесь вы можете ознакомится с договором и стать клиентом лучшей компании в мире.
          </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
            </CardActions>
          </Card>
        </Grid>

      </Grid>
    </div>



  );
}

