import React from 'react';

import './users.css';



export class Users extends React.Component {
  constructor(props){
    super(props);  
  };
  
  

  handleSubmit (event){
    event.preventDefault();
  
    fetch('https://localhost:44390/api/login', {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:event.target.email.value,
        pas:event.target.pas.value
      })
    }).then(res=> res.json())
    .then((result)=>
    {
      //let re=JSON.stringify(result[0])
      //console.log(re)
      //let obj = JSON.parse(JSON.stringify(result[0]));
      let usrName = (JSON.parse(JSON.stringify(result[0])).pemail)
      let usrPas = (JSON.parse(JSON.stringify(result[0])).pas)
      alert(usrName +' ' + usrPas)
      console.log(usrName.length)
     if (usrName.length>3 )
      window.location. replace('/');
      else 
      alert('Такого нет');
    },
    (error)=>
    {
      alert('Failed');
    })

    
  }

  

  render(){
    
    return (
      <div className="bgform">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div id="first">
            <div className="myform form ">
              <div className="logo mb-3">
                <div className="col-md-12 text-center">
                  <h1>Вход</h1>
                </div>
              </div>
              <form onSubmit={this.handleSubmit} method="post" name="login">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <input type="email" name="email"
                    className="form-control" id="email"
                    aria-describedby="emailHelp" placeholder="Введите Email" />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Password</label>
                  <input type="pas" name="pas" id="Введите пароль"
                    className="form-control" aria-describedby="emailHelp"
                    placeholder="Введите пароль" />
                </div>

                <div className="col-md-12 text-center ">
                  <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Войти</button>
                </div>
                <div className="col-md-12 ">
                  <div className="login-or">
                    <hr className="hr-or" />
                    <span className="span-or">или</span>
                  </div>
                </div>

                <div className="form-group">
                  <p className="text-center">Если вы не зарегистрированы - вам  <a href="/registration" id="signup">СЮДА</a></p>
                </div>
              </form>

            </div>
          </div>
          </div>
      </div>


  </div>


     
    );
  }
};



export default Users;
