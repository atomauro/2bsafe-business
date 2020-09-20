import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import { FirebaseAuthProvider } from 'use-firebase-auth';
import firebase from './api/firebase/firebase';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <FirebaseAuthProvider firebase={firebase}>{routing}</FirebaseAuthProvider>
    </ThemeProvider>
  );
};

export default App;
