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
import UserNameReducer from './reducers/AccessToken';

export const AccessTokenContext = React.createContext({} as any);
export const UserNameContext = React.createContext({} as any);

const App = () => {
  const [accessToken, tokenDispatch] = React.useReducer(AccessTokenReducer, '');
  const [userName, userDispatch] = React.useReducer(UserNameReducer, '');
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <AccessTokenContext.Provider
        value={{ accessTokenState: accessToken, accessTokenDispatch: tokenDispatch }}
      >
        <UserNameContext.Provider
        value={{ userNameState: userName, userNameDispatch: userDispatch }}
      >
        <GlobalStyles />
        <FirebaseAuthProvider firebase={firebase}>
          {routing}
          </FirebaseAuthProvider>
        </UserNameContext.Provider>
      </AccessTokenContext.Provider>
    </ThemeProvider>
  );
};

export default App;
