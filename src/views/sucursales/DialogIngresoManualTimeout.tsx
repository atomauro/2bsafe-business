import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Lottie from 'react-lottie';
import animationData from '../../assets/lotties/notavalable.json';

// AWS

export default function DialogIngresoManualTimeout({
  show,
  onClose,
  
    ...rest
  }: {
    show: boolean,   
    
    onClose:any,
  }) {
  
  const defaultOptions = {
    loop: false,      
    animationData
  };



  return (
    <div>
      <Dialog
        open={show}
        onClose={()=>{onClose()}}
        aria-labelledby="form-dialog-sdednotavalaible"
      >
        <DialogTitle id="form-dialog-sdednotavalaible">
          RESERVA FUERA DE TIEMPO
            
        </DialogTitle>
        <DialogContent>
         <Lottie options={defaultOptions} height={200} width={200} />          
          <DialogContentText>
            Estas intentando dar ingreso a una reserva por fuera de su tiempo de vigencia
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button color="primary" variant='outlined' onClick={() => { onClose() }}>
              Esta bien
          </Button>
        
        </DialogActions>
      </Dialog>
    </div>
  );
}
