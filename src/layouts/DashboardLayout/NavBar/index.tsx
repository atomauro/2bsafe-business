import React, { useEffect, useContext } from 'react';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import {
  Button,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  Grid,
  ListItem
} from '@material-ui/core';
import { Users as UsersIcon} from 'react-feather';
import NavItem from './NavItem';
import { useFirebaseAuth } from 'use-firebase-auth';
import LogOutIcon from '@material-ui/icons/ExitToApp';

const items = [
  {
    href: '/app/sucursales',
    icon: UsersIcon,
    title: 'Sucursales'
  }, 
];

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 73,
    height: 'calc(100% - 73px)'
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
  navitem: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  titleItem: {
    marginRight: 'auto'
  },
}));

const NavBar = ({
  onMobileClose,
  openMobile,
  userName,
  onLogOut
}: {
  onMobileClose: any;
  openMobile: boolean;
  onLogOut: any;
  userName: 'string';
}) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Grid
        container={true}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <div className={classes.divUser}>
          <Typography className={classes.name} color="textPrimary" variant="h5">
            {userName}
          </Typography>
        </div>

        <Typography
          className={classes.title}
          color="textSecondary"
          variant="body2"
        >
          Rol
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

      <ListItem
          className={clsx(classes.item)}
          disableGutters={true}
        >
          <Button
            className={classes.button}
            onClick={() => {
              onLogOut();
            }}
          >
            <LogOutIcon className={classes.icon} />
            <span className={classes.titleItem}>Cerrar sesion</span>
          </Button>
      </ListItem>
          
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
