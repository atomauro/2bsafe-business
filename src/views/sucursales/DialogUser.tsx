import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Lottie from 'react-lottie';

export default function DialogUser({
  show,
  onClose,
    type,
  user,
    ...rest
  }: {
    show: boolean,   
    type: string,
        onClose: any,
    user:any,
  }) {
  return (
    <div>
      <Dialog
        open={show}
        onClose={()=>{onClose()}}
        aria-labelledby="form-dialog-deletesucur"
      >
        <DialogTitle id="form-dialog-deletesucur">          
            {user.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Informacion de usuario
          </DialogContentText>
         
        </DialogContent>
        <DialogActions>        
            <Button color="primary" variant='contained' onClick={() => { onClose() }}>
              Cerrar
          </Button>) 
        </DialogActions>
      </Dialog>
    </div>
  );
}
