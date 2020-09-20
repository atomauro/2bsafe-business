import React, { useEffect } from 'react';
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
  Paper
} from '@material-ui/core';

import Page from '../../components/Page';

import { useFirebaseAuth } from 'use-firebase-auth';

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
  const {
    user,
    loading,
    error,
    signInWithEmailAndPassword
  } = useFirebaseAuth();

  const classes = useStyles();
  const navigate = useNavigate();
  useEffect(() => {
    console.log('user', user);
    if (user) {
      navigate('/app/sucursales', { replace: true });
    }
  }, [user]);

  return (
    <Page className={classes.root} title="Login">
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
                  email: 'confama@2bsafe.com',
                  password: 'Password123'
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
                onSubmit={async form => {
                  const possibleuser = await signInWithEmailAndPassword(
                    form.email,
                    form.password
                  );
                  if (possibleuser) {
                    navigate('/app/sucursales', { replace: true });
                  } else {
                    // TODO: FORM WARNINGS
                  }
                  console.log('possibleuser', possibleuser);
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
                        Sign in
                      </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom={true}
                        variant="body2"
                        style={{ marginTop: 10 }}
                      >
                        Internal platform of 2BSafe Business
                      </Typography>
                    </Box>

                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth={true}
                      helperText={touched.email && errors.email}
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
                        Sign in now
                      </Button>
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
