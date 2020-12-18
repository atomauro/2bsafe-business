import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Lottie from 'react-lottie';
import animationData from '../../assets/lotties/coronawarrior.json';

// AWS

export default function DialogIngresoManualSuccess({
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
        aria-labelledby="form-dialog-deletesucur"
      >
        <DialogTitle id="form-dialog-deletesucur">
          INGRESO EXITOSO
            
        </DialogTitle>
         <Lottie options={defaultOptions} height={350} width={350} />          
        <DialogContent>
          <DialogContentText>
            Se ha podido realizar el ingreso manual
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant='contained' onClick={() => { onClose() }}>
              Esta bien
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
