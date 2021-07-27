import React from 'react';

import  "./registration.css"



export class Registration extends React.Component {
  constructor(props){
    super(props);
  }

  handleSubmit (event){
    event.preventDefault();
    //alert(event.target.jurname.value)
    fetch('https://localhost:44390/api/registration', {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
    jurname:event.target.jurname.value,
    unp:event.target.unp.value,
    juraddress:event.target.juraddress.value,
    address:event.target.address.value,
    bankstring:event.target.bankstring.value,
    checkingaccount:event.target.checkingaccount.value,
    bankaddress:event.target.bankaddress.value,
    bic:event.target.bic.value,
    contactperson:event.target.contactperson.value,
    phone:event.target.phone.value,
    email:event.target.email.value
      })
    })

    .then(res=> res.json())
    .then((result)=>
    {
      alert(result);
    },
    (error)=>
    {
      alert('Failed');
    })
  }

  render(){
    return (
    
      <div className="regform">
   
            <div className="col-md-5 mx-auto">
              <div id="first">
                <div className="myform form ">
                  <div className="logo mb-3">
                    <div className="col-md-12 text-center">
                      <h1>Регистрация!</h1>
                    </div>
                  </div>
                  <form onSubmit={this.handleSubmit} method="post" name="login">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Наименование юр. лица</label>
                      <input type="name" name="jurname"
                        className="form-control" id="jurname"
                        aria-describedby="" placeholder="Пример юр лица" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">УНП</label>
                      <input type="name" name="unp"
                        className="form-control" id="unp"
                        aria-describedby="" placeholder="XXXXXXXXX" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Юр. адрес</label>
                      <input type="name" name="juraddress"
                        className="form-control" id="juraddress"
                        aria-describedby="" placeholder="Юр. адрес" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Адрес</label>
                      <input type="name" name="address"
                        className="form-control" id="address"
                        aria-describedby="" placeholder="Адрес" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Банквоские рекивзиты</label>
                      <input type="name" name="bankstring"
                        className="form-control" id="bankstring"
                        aria-describedby="" placeholder="Банквоские рекивзиты" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Расчётный счёт</label>
                      <input type="name" name="checkingaccount"
                        className="form-control" id="checkingaccount"
                        aria-describedby="" placeholder="Расчётный счёт" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Адрес банка</label>
                      <input type="name" name="bankaddress"
                        className="form-control" id="bankaddress"
                        aria-describedby="" placeholder="Адрес банка" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">БИК</label>
                      <input type="name" name="bic"
                        className="form-control" id="bic"
                        aria-describedby="" placeholder="БИК" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">ФИО контакного лица</label>
                      <input type="name" name="contactperson"
                        className="form-control" id="contactperson"
                        aria-describedby="" placeholder="ФИО контакного лица" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Телефон</label>
                      <input type="tel" name="phone" 
                      pattern="375[0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}"
                        className="form-control" id="phone"
                        placeholder="375XXXXXXXXX" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Адрес электронной почты</label>
                      <input type="email" name="email"
                        className="form-control" id="email"
                        aria-describedby="emailHelp" placeholder="Адрес электронной почты" />
                    </div>
                    
                    <div className="col-md-12 text-center ">
                      <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Зарегистрироваться</button>
                    </div>
                    
                  </form>
  
                </div>
              </div>
              </div>
  
  
  
      </div>
  
    );
  }
};

export default Registration;
