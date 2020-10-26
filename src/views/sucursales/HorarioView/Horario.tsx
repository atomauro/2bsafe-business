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
  Select,
  MenuItem,
    Grid,
    InputAdornment,
} from '@material-ui/core';

import DialogUser from '../DialogUser'

 
import BlockForm from './BlockForm';
import BlockList from './BlockList';
import useBlockState from './useBlockState';

import api from '../../../api/api';

const useStyles = makeStyles(theme => ({
  root: {
    },
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
  const [dayNumber, setDayNumber] = useState(0)
  const [day, setDay] = useState('Lunes')
  const [blocksOfDay, setBlocksOfDay] = useState({})

  const { semana, addBlock, deleteBlock } = useBlockState([]);


  const handleChangeDay = (event:any) =>{
    let numberDay =0
    switch (event.target.value) {
      case 'Lunes':
        numberDay=0
        break;
      case 'Martes':
        numberDay=1
        break;
      case 'Miercoles':
        numberDay=2
        break;
      case 'Jueves':
        numberDay=3
        break;
      case 'Viernes':
        numberDay=4
        break;
      case 'Sabado':
        numberDay=5
        break;
      case 'Domingo':
        numberDay=6
        break;
    }    
    setDayNumber(numberDay) 
    setDay(event.target.value)
    getBlocks(event.target.value)
  }

  const getBlocks = (daychoosed:string) => {
    console.log('Obtiene los bloques del dia: ' + daychoosed)    
  }


  return (
    
    <Grid 
    container={true} 
    direction="column" 
    justify="center"
    alignItems="center"
    spacing={2}
    style={{marginTop:20}}
    >
    
   
    <Grid 
    container={true} 
    direction="row" 
    justify="center"
    alignItems="center"
    spacing={2}
    >

    <Grid 
    item={true} 
    lg={4}
    md={8}
    justify="center"    
    alignItems="center">
    <Slide
      direction="down"
      in={true}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={{ enter: 500, exit: 500 }}
    >
      <Card>        
        <Box  flexDirection="column" style={{marginBottom:20, marginRight:5}}>
          <Box className={classes.message}>
            <Typography variant="h4" align="center" style={{margin:20}}>
              DIA
            </Typography>
            <Select                    
                id="dia"
                name="dia"
                value={day}
                onChange={handleChangeDay}
                label="Dia"                
              >                    
                <MenuItem value={'Lunes'}>Lunes</MenuItem>
                <MenuItem value={'Martes'}>Martes</MenuItem>
                <MenuItem value={'Miercoles'}>Miercoles</MenuItem>
                <MenuItem value={'Jueves'}>Jueves</MenuItem>
                <MenuItem value={'Viernes'}>Viernes</MenuItem>
                <MenuItem value={'Sabado'}>Sabado</MenuItem>
                <MenuItem value={'Domingo'}>Domingo</MenuItem>
              </Select>
          </Box> 
        </Box>
      </Card>
    </Slide>
    </Grid>



    <Grid container={true} lg={4} md={8}>

        <Grid lg={12} md={10}>
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
              
              <Box className={classes.message}>
                <BlockForm
                    saveBlock={(blockText:string) => {                       
                        addBlock(blockText, dayNumber);                        
                    }}/>             
              </Box>
            </Box>
            </>
          </Card> 
        </Slide>
          </Grid>

          </Grid>

          <Grid 
          lg={8} 
          md={10}
          justify="center"
          alignItems="center">
              <Fade
              in={true}
              mountOnEnter={true}
              unmountOnExit={true}
              timeout={{ enter: 500, exit: 500 }}
            >
              <Card className={clsx(classes.root, className)} {...rest}>       
                <PerfectScrollbar>          
                  <Box width="100%" style={{display:'flex',justifyContent:'center'}}>               
                  
                    <BlockList blocks={[]} deleteBlock={deleteBlock} /> 
                  
                  </Box>
                </PerfectScrollbar>
              </Card>
            </Fade>
          </Grid>

    </Grid>    
      
      <Backdrop className={classes.backdrop} open={isLoading} onClick={()=>{console.log('dont close')}}>
        <CircularProgress color="inherit" />
      </Backdrop>
 
  
      </Grid>
  );
};

export default Horario;
