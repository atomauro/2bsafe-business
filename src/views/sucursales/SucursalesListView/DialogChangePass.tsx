import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Lottie from 'react-lottie';
import * as animationData from '../../../assets/lotties/new-pass.json';

export default function DialogChangePass({
  show,
  onClose,
    ...rest
  }: {
      show: boolean,
      onClose: any,
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
        aria-labelledby="form-dialog-changepass"
      >
        <DialogTitle id="form-dialog-changepass">Cambiar clave</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Introduce a continuación una nueva clave para la sucursal
          </DialogContentText>
          <Lottie options={defaultOptions} height={200} width={200} />
          <TextField
            autoFocus={true}
            margin="dense"
            id="newpass"
            label="Nueva clave"
            type="text"
            fullWidth={true}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary">
            Cancelar
          </Button>
          <Button color="primary" variant='outlined'>
            Cambiar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
