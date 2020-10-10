import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

import StartscoLogo from '../../assets/startscologo.png';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 4,
    backgroundColor: '#FFFFFF',
    height: 'auto',
    marginTop:30,
  },
  startscoLogo:{
    width:20,
    height:20,
    marginLeft: 5,    
  }
}));

const Footer = (props: any) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)} align="center">
      <Typography variant="body1" >
        &copy;{' '}
        Panel Administrativo de Reservas 
      </Typography>      
      <Typography variant="body2" >       
        <Link component="a" href="https://smartfit.com.co" target="_blank">
          Smartfit 
        </Link>
         - Colombia . 2020
      </Typography>          
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
