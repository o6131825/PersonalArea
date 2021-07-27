import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '60%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Order() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Создание заказа</h2>
      
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
          <Button  onClick={handleClose} color="primary">
            Отмена
          </Button>
        </DialogActions>
     

      </form>
      
      
    </div>
  );

  return (
    <div className='container'>
      <h3 className="hh3">Заказы</h3>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        //onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
