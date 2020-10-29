import React, { useEffect, useState, useContext } from 'react';
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
import {
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  BarChart as BarChartIcon,
  Calendar as CalendarIcon,
} from 'react-feather';

import NavItem from './NavItem';
import LogOutIcon from '@material-ui/icons/ExitToApp';
// import ProfileIcon from '@material-ui/icons/AccountCircle'


const items = [
  {
    href: '/app/sucursales',
    icon: UsersIcon,
    title: 'Sucursales'
  },
  {
    href: '/app/perfiles',
    icon: UserIcon,
    title: 'Perfiles'
  }
];

const itemsSucursales = [
  {
    href: '/app/sucursales',
    icon: UsersIcon,
    title: 'Principal'
  },
  {
    href: '/app/perfiles',
    icon: UserIcon,
    title: 'Perfiles'
  },
  {
    href: '/app/horario',
    icon: CalendarIcon,
    title: 'Horario'
  }
];

const useStyles = makeStyles(theme => ({
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
    margin: 15
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
  }
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
  userName: string;
}) => {
  const classes = useStyles();
  const location = useLocation();

  const [typeUser, setTypeUser] = useState('');

  const name = userName.substring(0, userName.lastIndexOf('@'));
  const domain = userName.substring(userName.lastIndexOf('@') + 1);

  useEffect(() => {
    console.log(name, domain);
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    if (domain === '2bsafe.com') {
      setTypeUser('admin');
    } else {
      setTypeUser('sucursal');
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
          <Typography className={classes.name} color="textPrimary" variant="h4">
            {typeUser === 'admin' ? 'Administrador' : 'Sucursal'}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          color="textSecondary"
          variant="body1"
        >
          Usuario
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          variant="h5"
        >
          {typeUser === 'admin' ? 'SmartFit' : name}
        </Typography>
      </Grid>
      <Divider />
      <Box p={2}>
        <List>
          {typeUser === 'admin'
            ? items.map(item => (
                <NavItem
                  className={classes.navitem}
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              ))
            : itemsSucursales.map(item => (
                <NavItem
                  className={classes.navitem}
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              ))}

          <ListItem className={clsx(classes.item)} disableGutters={true}>
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
