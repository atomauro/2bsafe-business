import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from '../../components/Logo';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  },
  icons:{
    color: 'white'
  }
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }: {className: string, onMobileNavOpen: any}) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <Logo draggable={false} />

        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton className={classes.icons}>
            <InputIcon className={classes.icons}/>
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton className={classes.icons} onClick={onMobileNavOpen}>
            <MenuIcon className={classes.icons}/>
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
