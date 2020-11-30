import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  Paper,
  LinearProgress,
  Fade
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

import Page from '../../components/Page';

import api from '../../api/api';
import { AccessTokenContext } from '../../App';
import { UserNameContext } from '../../App';

import State from './../../reducers/State';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  paper: {
    width: 'auto',
    height: 'auto'
  }
}));

const LoginView = () => {
  const { accessTokenDispatch, accessTokenState } = useContext(
    AccessTokenContext
  );
  const { userNameDispatch, userNameState } = useContext(UserNameContext);

  const [error, setError] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  const [alertStatus, setAlertStatus] = useState('invisible');

  const handleAlertStatus = (status: string) => {
    setAlertStatus(status);      
    setTimeout(() => {
      setAlertStatus('invisible');   
    }, 600);
  };

  const getMessageAlert = () => {
    switch (alertStatus) {
      case 'success':
        return 'Ingreso Exitoso';
        break;
      case 'warning':
        return 'Revisa y vuelve a intentarlo';
        break;
      case 'offline':
        return 'Te encuentras sin internet';
        break;
      case 'online':
        return 'Te encuentras con internet';
        break;
      default:
        return 'Revisa y vuelve a intentarlo';
        break;
    }
  };

  const getTypeAlert = () => {
    switch (alertStatus) {
      case 'success':
        return alertStatus;
        break;
      case 'warning':
        return alertStatus;
        break;
      case 'offline':
        return 'info';
        break;
      case 'online':
        return 'info';
        break;
      default:
        return 'warning';
        break;
    }
  };

  const [Api2BSafe, setApi2BSafe] = useState(null as any);

  useEffect(() => {
    console.log('accessTokenState', accessTokenState);
    if ((Api2BSafe && Api2BSafe.accessToken) || accessTokenState) {
      console.log(
        'payload',
        Api2BSafe && Api2BSafe.accessToken
          ? Api2BSafe.accessToken
          : accessTokenState
      );
      accessTokenDispatch({
        type: 'SET',
        payload:
          Api2BSafe && Api2BSafe.accessToken
            ? Api2BSafe.accessToken
            : accessTokenState
      });
      navigate('/app/sucursales', {
        replace: true
      });
    } else if (Api2BSafe && Api2BSafe.loginError) {
      setError(true);      
    }
    console.log('Api2BSafe', Api2BSafe);
  }, [Api2BSafe, accessTokenState]);

  return (
    <Page className={classes.root} title="Login">
      <State
        state={{
          dashboard2bsafeAccessToken: accessTokenState,
          userName: userNameState
        }}
      />
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Paper className={classes.paper} elevation={5}>
            <div style={{ margin: 20 }}>
              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .max(255)
                    .required('La Sede es requerida'),
                  password: Yup.string()
                    .max(255)
                    .required('La clave es necesaria')
                })}
                onSubmit={async (form, actions) => {                  
                  actions.setSubmitting(true);                  
                  setTimeout(() => {
                    if (form.email.toLowerCase() === 'smart-fit@2bsafe.com') { 
                        api({
                    email: form.email.toLowerCase(),
                    password: form.password
                    }).then(apiResult => {
                      if (apiResult.loginError) {
                        actions.setErrors({email:'',password:''})
                        handleAlertStatus('warning')
                      } else {
                        handleAlertStatus('success')
                        setApi2BSafe(apiResult);
                        
                        userNameDispatch({
                          type: 'SET',
                          payload: form.email.toLowerCase()
                        });                        
                    }
                    });
                    }
                    else {
                       api({
                    email: form.email.toLowerCase() + '@smart-fit.com',
                    password: form.password
                    }).then(apiResult => {
                      if (apiResult.loginError) {
                        actions.setErrors({email:'',password:''})
                        handleAlertStatus('warning')
                      } else {
                        handleAlertStatus('success')
                        setApi2BSafe(apiResult);
                        userNameDispatch({
                          type: 'SET',
                          payload: form.email.toLowerCase() + '@smart-fit.com'
                        });                        
                    }
                    });
                    }
                   
                    actions.setSubmitting(false); 
                  }, 1000);                                                  
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values
                }) => (
                    <>
                  <form onSubmit={handleSubmit}>
                    <Box mb={3} style={{ paddingTop: 20 }}>
                      <Typography color="textPrimary" variant="h2">
                        Login
                      </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom={true}
                        variant="body2"
                        style={{ marginTop: 10 }}
                      >
                        Plataforma interna de Smartfit Center
                      </Typography>
                    </Box>
                    <TextField
                      error={Boolean(touched.email && (errors.email || error))}
                      fullWidth={true}
                      helperText={touched.email && (errors.email || error)}
                      label="Sucursal o Sede"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder={"Usuario de Sucursal"}
                      type="text"
                      value={values.email}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      fullWidth={true}
                      helperText={touched.password && errors.password}
                      label="Contraseña"
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder={"Contraseña"}
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    <Box my={2}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth={true}
                        size="large"
                        type="submit"
                        variant="contained"
                        style={{ marginBottom: 20 }}
                      >
                            Iniciar
                      </Button>                    
                      {isSubmitting ? <LinearProgress /> : null}    
                      </Box>
                  </form>                  
                </>
                )}
              </Formik>
            </div>
          </Paper>
        </Container>
        <Fade
          in={!(alertStatus === 'invisible')}
          timeout={{ enter: 500, exit: 500 }}
        >
          <Alert
            variant="filled"
            severity={getTypeAlert()}
            style={{ margin: 20, display: 'flex', justifyContent: 'center' }}
          >
            {getMessageAlert()}
          </Alert>
        </Fade>
      </Box>
    </Page>
  );
};

export default LoginView;
