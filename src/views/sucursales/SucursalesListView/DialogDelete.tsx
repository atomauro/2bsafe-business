import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Lottie from 'react-lottie';
import * as animationData from '../../../assets/lotties/delete.json';

export default function DialogDelete({
  show,
  onClose,
  onClick,
    ...rest
  }: {
    show: boolean,
    onClose: any,
    onClick: any,
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
        <DialogTitle id="form-dialog-deletesucur">ELIMINAR SUCURSAL</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estas seguro de eliminar la Sucursal?
          </DialogContentText>
          <Lottie options={defaultOptions} height={200} width={200} />          
        </DialogContent>
        <DialogActions>
          <Button  color="primary" onClick={()=>{onClose()}}>
            Cancelar
          </Button>
          <Button color="primary" variant='outlined' onClick={() => { onClick() }}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
