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

import DialogUser from '../DialogUser'

 
import BlockForm from './BlockForm';
import BlockList from './BlockList';
import useBlockState from './useBlockState';

import api from '../../../api/api';

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

const Horario = ({
  className,
  credentials,
  ...rest
}: {
  className: any;
  credentials: any;
}) => {
  const classes = useStyles();


  const [showDialogUser, setShowDialogUser] = useState(false);
  const [isLoading, setisLoading] = useState(false)


  const { blocks, addBlock, deleteBlock } = useBlockState([]);

  return (
    <>
    <Slide
      direction="down"
      in={true}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={{ enter: 500, exit: 500 }}
    >
      <Card className={clsx(classes.root, className)} {...rest}>
        <>
        <Box  flexDirection="column" style={{marginBottom:20}}>
          <Box className={classes.message}>
            <Typography variant="h4" align="center" style={{margin:20}}>
              Edita los bloques para los horarios de reserva
            </Typography>
          </Box>          
          </Box>
          <Box className={classes.message}>
            <BlockForm
                    saveBlock={(blockText:string) => {
                    const trimmedText = blockText.trim();

                    if (trimmedText.length > 0) {
                        addBlock(trimmedText);
                    }
                    }}/>             
            </Box>
          </>
      </Card>
      </Slide>
      
      <Fade
      in={true}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={{ enter: 500, exit: 500 }}
    >
      <Card className={clsx(classes.root, className)} {...rest}>       
        <PerfectScrollbar>          
          <Box width="100%">       
          
              


          <BlockList blocks={blocks} deleteBlock={deleteBlock} />

          </Box>
        </PerfectScrollbar>
        </Card>
      </Fade>
      
      <Backdrop className={classes.backdrop} open={isLoading} onClick={()=>{console.log('dont close')}}>
        <CircularProgress color="inherit" />
      </Backdrop>
 </>
  );
};

export default Horario;
