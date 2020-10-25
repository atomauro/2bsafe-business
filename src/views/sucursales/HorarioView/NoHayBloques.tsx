import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  makeStyles,
  Fade,
  Slide,
  Button,
  CardContent,
  Backdrop,
  CircularProgress,
  Typography,
  TextField,
  Paper,   
    Grid,
    InputAdornment,
} from '@material-ui/core';

import Lottie from 'react-lottie';

import * as animationDataMancuerna from '../../../assets/lotties/mancuerna.json';
import * as animationDataCalendario from '../../../assets/lotties/calendario.json';


const useStyles = makeStyles(theme => ({
  root: {},
   message: {
    display: 'flex',
    justifyContent: 'center',
    height: 'auto'
  },
  button: {
     margin:10
   },
   backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const SearchUser = (props:any) => {
  const classes = useStyles();

  const defaultOptionsMancuerna = {
    loop: false,
    animationData: animationDataMancuerna
  };

  const defaultOptionsCalendario = {
    loop: false,
    animationData: animationDataCalendario
  };
   

  return (

   <Fade
      in={true}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={{ enter: 500, exit: 500 }}
    >
     <>
        <Box flexDirection="column" className={classes.message}>
            <Typography variant="h4" align="center" style={{margin:20}}>
              ¡Aún no hay bloques, crealos!
            </Typography>
          </Box>
          <div style={{display:'flex', justifyContent:'center'}}>
            <Lottie options={defaultOptionsCalendario} height={200} width={200} />  
          </div>
          <div style={{display:'flex', justifyContent:'center'}}>
            <Lottie options={defaultOptionsMancuerna} height={100} width={100} />  
          </div>
     </>
      
      
      
      </Fade>
      

  );
};

export default SearchUser;
