import React, { useState, useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { useFirebaseAuth } from 'use-firebase-auth';
import { useNavigate } from 'react-router-dom';
import { AccessTokenContext } from '../../App';

import State from './../../reducers/State';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#F4F6F8',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  },
  topBar: {}
}));

const DashboardLayout = ({ history }: { history: any }) => {
  const { accessTokenState, accessTokenDispatch } = useContext(
    AccessTokenContext
  );

  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('accessTokenState', accessTokenState);
    if (accessTokenState === '') {
      console.log('Por lo tanto...');
      navigate('/login', { replace: true });
    }
  }, [accessTokenState]);

  const signOutUser = () => {
    accessTokenDispatch({ type: 'RESET' });
  };

  return (
    <div className={classes.root}>
      <State state={{ dashboard2bsafeAccessToken: accessTokenState }} />
      <TopBar
        onMobileNavOpen={() => setMobileNavOpen(true)}
        className={classes.topBar}
        onLogOut={signOutUser}
      />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        onLogOut={signOutUser}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
