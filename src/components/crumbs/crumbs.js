import React from 'react';
import { emphasize, withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import "./crumbs.css"

import Grid from '@material-ui/core/Grid';


import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import PersonIcon from '@material-ui/icons/Person';





import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function handleClickMain(event) {
  <Link to="/" activeClassName="active"></Link>
}

function handleClickContract(event) {
  <Link to="/contract" activeClassName="active"></Link>
}

function handleClickContract1(event) {
  <Link to="/ddvd.pdf" activeClassName="active"></Link>
}

function handleClickUsers(event) {
  if (localStorage.getItem('Имя пользователя')===null){
    //<Link to="/users" activeClassName="active"></Link>
    window.location. replace('/users');
  }
  else{
    localStorage.clear();
    //<Link to="/" activeClassName="active"></Link>
    window.location. replace('/');
  }
  
}

function loginIn(){
  if(localStorage.getItem('Имя пользователя')===null){
     loginName = 'Вход'
  }
  else {
    loginName= (localStorage.getItem('Имя пользователя') )
  }
}

let loginName;

export default function CustomizedBreadcrumbs() {

loginIn();

console.log (localStorage.getItem('Имя пользователя'))
  return (


    <div>
      <Grid container>
        <Grid item xs={10} sm={10} md={10} >
          <Breadcrumbs aria-label="breadcrumb">

            <StyledBreadcrumb
              component="a"
              href="/"
              label="Главная"
              icon={<HomeIcon fontSize="small" />}
              onClick={handleClickMain}
            />
            <StyledBreadcrumb
              component="a"
              href="/users"
              label="Авторизация"
              onClick={handleClickUsers} />

            <StyledBreadcrumb
              component="a"
              href="/ddvd.pdf"
              label="Договор!"
              deleteIcon={<ExpandMoreIcon />}
              onClick={handleClickContract1}
            />

          </Breadcrumbs>

        </Grid>
        <Grid item xs={1} sm={1} md={1} >
          <Button

            style={{ color: '#4398fa' }}
            size="small"
            //href="/users"
            onClick={handleClickUsers}
            startIcon={<PersonIcon />}
          >
            {loginName}
            </Button>
        </Grid>
      </Grid>
    </div>

  );
}
