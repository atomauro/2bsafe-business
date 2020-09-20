import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  Grid
} from '@material-ui/core';
import { Users as UsersIcon } from 'react-feather';
import NavItem from './NavItem';
import { useFirebaseAuth } from 'use-firebase-auth';

// {
//   avatar: '/static/images/avatars/confama.jpg',
//   jobTitle: 'Caja de Compensación Familiar de Antioquia',
//   name: 'CONFAMA'
// };

const items = [
  {
    href: '/app/sucursales',
    icon: UsersIcon,
    title: 'Sucursales'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 80,
    height: 80,
    marginBottom: 10,
    marginTop: 10
  },
  name: {
    margin: 10
  },
  divUser: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    margin: 20
  },
  navitem: {}
}));

const NavBar = ({
  onMobileClose,
  openMobile
}: {
  onMobileClose: any;
  openMobile: boolean;
}) => {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useFirebaseAuth();
  console.log('user', user);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Grid container direction="column" justify="center" alignItems="center">
        <Avatar
          className={classes.avatar}
          src={user.avatar}
          draggable="false"
        />
        <div className={classes.divUser}>
          <Typography className={classes.name} color="textPrimary" variant="h5">
            {user?.displayName}
          </Typography>
        </div>

        <Typography
          className={classes.title}
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Grid>
      <Divider />
      <Box p={2}>
        <List>
          {items.map(item => (
            <NavItem
              className={classes.navitem}
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp={true}>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown={true}>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open={true}
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default NavBar;
