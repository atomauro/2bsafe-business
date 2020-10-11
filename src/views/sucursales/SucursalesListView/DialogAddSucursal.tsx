import React from 'react'

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  makeStyles,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  Grid
} from '@material-ui/core';

import Lottie from 'react-lottie';

import * as animationData from '../../../assets/lotties/ubicacion2.json';

const DialogAddSucursal = ({
    open,
    handleClose,
  ...rest
}: {
  open: boolean;
  handleClose: any;
    }) => {
    
    const defaultOptions = {
        loop: false,
        animationData
    };
    
    return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">AGREGAR SUCURSAL</DialogTitle>
        <DialogContent>
          <Lottie options={defaultOptions} height={200} width={200} />
          <DialogContentText>
            Para agregar una nueva sucursal o sede, solo es necesario ingresar a
            continuacion el nombre o la ubicacion del establecimiento, utilice
            palabras clave, sin espacios. Ejemplo: Laureles, SedeLaureles,
            Poblado1, Poblado2
          </DialogContentText>
          <TextField
            autoFocus={true}
            margin="dense"
            id="name"
            label="Nombre sucursal"
            type="text"
            fullWidth={true}
            onChange={(e: any) => {
              console.log('e', e);
              
            }}
          />
        </DialogContent>
        <DialogActions>
                <Button onClick={() => { handleClose() }} color="primary">
            Cancelar
          </Button>
                <Button onClick={() => { handleClose() }} color="primary">
            Agregar sucursal
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default DialogAddSucursal
