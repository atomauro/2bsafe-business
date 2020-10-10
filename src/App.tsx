import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import { FirebaseAuthProvider } from 'use-firebase-auth';
import firebase from './api/firebase/firebase';
import AccessTokenReducer from './reducers/AccessToken';

export const AccessTokenContext = React.createContext({} as any);

const App = () => {
  const [accessToken, dispatch] = React.useReducer(AccessTokenReducer, '');
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <AccessTokenContext.Provider
        value={{ accessTokenState: accessToken, accessTokenDispatch: dispatch }}
      >
        <GlobalStyles />
        <FirebaseAuthProvider firebase={firebase}>
          {routing}
        </FirebaseAuthProvider>
      </AccessTokenContext.Provider>
    </ThemeProvider>
  );
};

export default App;
