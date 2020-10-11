import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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

import AddCircleIcon from '@material-ui/icons/AddCircle';
import BackIcon from '@material-ui/icons/ArrowBack';
import Lottie from 'react-lottie';

import * as animationData from '../../../assets/lotties/ubicacion2.json';

import api from './../../../api/api';
import { AccessTokenContext } from '../../../App';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    justifyContent: 'center',
    height: 40
  },
  divSucursales: {
    align: 'center'
  }
}));

const Toolbar = ({
  className,
  onClose,
  currentView,
  handlePressBack,
  isReserva,
  ...rest
}: {
  className: any;
  onClose: any;
  currentView: string;
  isReserva: boolean;
  handlePressBack: any;
}) => {
  const classes = useStyles();

  const [sucursalField, setSucursalField] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    onClose(sucursalField);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData
  };

  return (
    <Slide direction="down" in={true} mountOnEnter={true} unmountOnExit = {true} timeout={{ enter: 500, exit: 500 }}>
      <div className={clsx(classes.root, className)} {...rest}>
        <Grid
          container={true}
          direction="row"
          justify="space-evenly"
          alignItems="center">
           {currentView === '' ?
              <Box display="flex" justifyContent="flex-end">
                <Button
                  color="primary"
                  variant="contained"
                  endIcon={<AddCircleIcon />}
                  onClick={() => setOpen(true)}
                >
                  Agregar sucursal
                </Button>
              </Box>
            : <Box display="flex" justifyContent="flex-start">
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<BackIcon />}                
                onClick={() => { handlePressBack() }}
                >
                Atras
                </Button>
              </Box>
        }
      </Grid>
      
      <Box mt={3}>
        <Card>
          <CardContent>
              <div className={classes.divSucursales}>
              <Grid
              container={true}
              direction="column"
              justify="center"
              alignItems="center"
              >
              <Box maxWidth={500} className={classes.message}>
              {currentView === '' ?
                  <Typography variant="h4" align="center">
                        Desde aqui puedes agregar las sucursales y visualizar las
                        claves generadas
                  </Typography>
                    : isReserva ?                      
                        <div>                        
                        <Typography variant="h4" align="center" style={{ margin: 5 }}>
                            Historico de Reservas
                          </Typography>
                          <Typography variant="h5" align="center" style={{margin:5}}>
                            Sucursal:
                          </Typography>                          
                      </div>    
                      :
                      <div>                        
                        <Typography variant="h4" align="center" style={{ margin: 5 }}>
                            Historico de Ingresos
                          </Typography>
                          <Typography variant="h5" align="center" style={{margin:5}}>
                            Sucursal:
                          </Typography>
                      </div>
                
                  }
              </Box>
                <Typography variant="h4" align="center" style={{color:'#FDB825', marginTop:20, fontWeight:'bold', textDecoration:'underline'}}>
                  {currentView}
                </Typography>
              </Grid>
            </div>
          </CardContent>
        </Card>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">AGREGAR SUCURSAL</DialogTitle>
        <DialogContent>
          <Lottie options={defaultOptions} height={400} width={400} />
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
            value={sucursalField}
            onChange={(e: any) => {
              console.log('e', e);
              setSucursalField(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Agregar sucursal
          </Button>
        </DialogActions>
      </Dialog>
      </div>
      </Slide>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
