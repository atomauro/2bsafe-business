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
  LinearProgress
} from '@material-ui/core';

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

const LoginView = ({ empresa }: any) => {
  const { accessTokenDispatch, accessTokenState } = useContext(
    AccessTokenContext
  );
  const { userNameDispatch, userNameState } = useContext(
    UserNameContext
  );

  const [error, setError] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

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
      <State state={{ accessToken: accessTokenState }} />
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
                  email: 'smart-fit@2bsafe.com',
                  password: 'mdYd2ZSkwQ'
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email('Must be a valid email')
                    .max(255)
                    .required('Email is required'),
                  password: Yup.string()
                    .max(255)
                    .required('Password is required')
                })}
                onSubmit={async (form, actions) => {
                  // let possibleuser = await signInWithEmailAndPassword(
                  //   form.email,
                  //   form.password
                  // );
                  actions.setSubmitting(true);

                  api({
                    empresa: form.email.slice(0, form.email.indexOf('@')),
                    password: form.password
                  }).then(apiResult => {
                    setApi2BSafe(apiResult);
                    userNameDispatch({
                      type: 'SET',
                      payload: form.email,
                    });
                  });
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
                      label="Email Address"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      fullWidth={true}
                      helperText={touched.password && errors.password}
                      label="Password"
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
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
                )}
              </Formik>
            </div>
          </Paper>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
