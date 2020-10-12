import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography,
  Slide,
  Grid
} from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import BackIcon from '@material-ui/icons/ArrowBack';
import RefreshICon from '@material-ui/icons/Cached';

import ReservaIcon from '@material-ui/icons/AssignmentInd';
import IngresoIcon from '@material-ui/icons/AssignmentTurnedIn';

import api from './../../../api/api';
import { useNavigate } from 'react-router-dom';

import DialogAddSucursal from './DialogAdd';

import { AccessTokenContext } from '../../../App';
import { UserNameContext } from '../../../App';
import State from './../../../reducers/State';


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
    handleAddSucursal,
    handlePressRefresh,
    handleShowReservas,
    handleShowIngresos,
    ...rest
  }: {
    className: any;
    onClose: any;
    currentView: string;
    isReserva: boolean;
    handlePressBack: any;
    handleAddSucursal: any;
    handlePressRefresh: any;
    handleShowReservas: any;
    handleShowIngresos: any;    
  }) => {
    const classes = useStyles();

    const [sucursalField, setSucursalField] = useState('');
    const [open, setOpen] = useState(false);

    const { accessTokenState, accessTokenDispatch } = useContext(
      AccessTokenContext
    );
    const { userNameState, userNameDispatch } = useContext(UserNameContext);

    const [typeUser, setTypeUser] = useState('');

    const name = userNameState.substring(0, userNameState.lastIndexOf("@"));
    const domain = userNameState.substring(userNameState.lastIndexOf("@") + 1);
  
    const handleClose = () => {
      setOpen(false);
      onClose(sucursalField);
    };

    useEffect(() => {
      console.log(name, domain)
      if (domain === '2bsafe.com') {
        setTypeUser('admin')
      } else {
        setTypeUser('sucursal')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
    <>
        <State
        state={{
          dashboard2bsafeAccessToken: accessTokenState,
          userName: userNameState
        }}
      />
    <Slide
      direction="down"
      in={true}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={{ enter: 500, exit: 500 }}
    >
      <div className={clsx(classes.root, className)} {...rest}>
        <Grid
          container={true}
          direction="row"
          justify="space-evenly"
          alignItems="center"
            >
              {typeUser === 'admin' ?
                currentView === '' ? (
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
                ) : (
                    <Box display="flex" justifyContent="space-evenly">
                      <Button
                        color="primary"
                        variant="contained"
                        startIcon={<BackIcon />}
                        onClick={() => {
                          handlePressBack();
                        }}
                      >
                        Atras
              </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        style={{ backgroundColor: '#FDB825' }}
                        endIcon={<RefreshICon />}
                        onClick={() => {
                          handlePressRefresh()
                        }}
                      >
                        Actualizar
              </Button>
                    </Box>
                  ) :
                typeUser === 'sucursal' ?
                  (
                   <Box display="flex" justifyContent="space-evenly">
                      <Button
                        color="primary"
                        variant="contained"
                        startIcon={<ReservaIcon />}
                        onClick={() => {
                          console.log("Toolbar: trayendo reservas de:",name)    
                            handleShowReservas(name);
                            }}
                      >
                        Reservas
              </Button>
                      <Button
                        color="primary"
                        variant="contained"                        
                        endIcon={<IngresoIcon />}
                        style={{ backgroundColor: '#FDB825' }}
                        onClick={() => {
                           console.log("Toolbar: trayendo registros de:",name)
                              handleShowIngresos(name);
                            }}
                      >
                        Ingresos
              </Button>
                    </Box>   
                  ):
                    (
                    <Box display="flex" justifyContent="space-evenly">
                      <Button
                        color="primary"
                        variant="contained"
                        startIcon={<BackIcon />}
                        onClick={() => {
                          handlePressBack();
                        }}
                      >
                        Atras
              </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        style={{ backgroundColor: '#FDB825' }}
                        endIcon={<RefreshICon />}
                        onClick={() => {
                          handlePressBack();
                        }}
                      >
                        Actualizar
              </Button>
                    </Box>
                  )
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
                        {typeUser==='admin'?
                          (currentView === '' ? (
                            <Typography variant="h4" align="center">
                              Desde aqui puedes agregar, editar y eliminar las sucursales.
                            </Typography>
                          ) : isReserva ? (
                            <div>
                              <Typography
                                variant="h4"
                                align="center"
                                style={{ margin: 5 }}
                              >
                                Historico de Reservas
                              </Typography>
                              <Typography
                                variant="h5"
                                align="center"
                                style={{ margin: 5 }}
                              >
                                  Sucursal:
                              </Typography>
                                <Typography
                                variant="h4"
                                align="center"
                                style={{
                                  color: '#FDB825',
                                  marginTop: 20,
                                  fontWeight: 'bold',
                                  textDecoration: 'underline'
                                }}
                              >
                                {currentView}
                              </Typography>
                            </div>
                          ) : (
                            <div>
                              <Typography
                                variant="h4"
                                align="center"
                                style={{ margin: 5 }}
                              >
                                Historico de Ingresos
                              </Typography>
                              <Typography
                                variant="h5"
                                align="center"
                                style={{ margin: 5 }}
                              >
                                    Sucursal:
                              </Typography>
                                  <Typography
                                variant="h4"
                                align="center"
                                style={{
                                  color: '#FDB825',
                                  marginTop: 20,
                                  fontWeight: 'bold',
                                  textDecoration: 'underline'
                                }}
                              >
                                {currentView}
                              </Typography>
                            </div>
                              )) :
                          (currentView === '' ? (
                            <Typography variant="h4" align="center">
                              Desde aqui puedes visualizar las reservas e ingresos
                            </Typography>
                          ) : isReserva ? (
                            <div>
                              <Typography
                                variant="h4"
                                align="center"
                                style={{ margin: 5 }}
                              >
                                Historico de Reservas
                              </Typography>
                              <Typography
                                variant="h5"
                                align="center"
                                style={{ margin: 5 }}
                              >
                                Sucursal:
                              </Typography>
                              <Typography
                                variant="h4"
                                align="center"
                                style={{
                                  color: '#FDB825',
                                  marginTop: 20,
                                  fontWeight: 'bold',
                                  textDecoration: 'underline'
                                }}
                              >
                                {name}
                              </Typography>
                            </div>
                          ) : (
                            <div>
                              <Typography
                                variant="h4"
                                align="center"
                                style={{ margin: 5 }}
                              >
                                Historico de Ingresos
                              </Typography>
                              <Typography
                                variant="h5"
                                align="center"
                                style={{ margin: 5 }}
                              >
                                    Sucursal:
                              </Typography>
                              <Typography
                                variant="h4"
                                align="center"
                                style={{
                                  color: '#FDB825',
                                  marginTop: 20,
                                  fontWeight: 'bold',
                                  textDecoration: 'underline'
                                }}
                              >
                                {name}
                              </Typography>
                            </div>
                          ))                            
                        }
                  </Box>
                  
                </Grid>
              </div>
            </CardContent>
          </Card>
        </Box>
        <DialogAddSucursal
          open={open}
          handleClose={handleClose}
          handleAddSucursal={handleAddSucursal}
        />
      </div>
        </Slide>
      </>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
