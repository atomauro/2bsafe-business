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

export default function DialogChangePass() {
  const [open, setOpen] = React.useState(false);

  const handleClick = (editDialog: boolean) => {
    setOpen(editDialog);
  };

   const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => { handleClick(false) }}
        aria-labelledby="form-dialog-changepass"
      >
        <DialogTitle id="form-dialog-changepass">Cambiar clave</DialogTitle>
        <DialogContent>
          <Lottie options={defaultOptions} height={400} width={400} />
          <DialogContentText>
            Introduce a continuación una nueva clave para la sucursal
          </DialogContentText>
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
          <Button onClick={() => { handleClick(false) }} color="primary" variant='outlined'>
            Cancelar
          </Button>
          <Button onClick={() => { handleClick(false) }} color="primary">
            Cambiar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
