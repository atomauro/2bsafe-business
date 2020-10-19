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
  Typography,
  TextField,
  Paper,   
    Grid,
    InputAdornment,
} from '@material-ui/core';

import DialogUser from '../DialogUser'

import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
  root: {},
   message: {
    display: 'flex',
    justifyContent: 'center',
    height: 'auto'
  },
  button: {
     margin:10
   }
}));



const SearchUser = ({
  className,
  ...rest
}: {
  className: any;
 
}) => {
  const classes = useStyles();

  const [userDocument, setUserDocument] = useState('');
  const [showDialogUser, setShowDialogUser] = useState(false);

const handleFetchUser = () => {
  console.log('user fetchs')
  setShowDialogUser(true)
  }
  
  const handleChange = (e: any) => {
    setUserDocument(e.target.value)
    console.log("SEARCH USER:",e.target.value)
  }
  

  const user = {
    email: "mauro.henaog@gmail.com",
    name: 'Mauricio Henao Gómez',
    phone: '31237864324',
    status: 'ACTIVE',
    birthdate: '16/07/08',
    remaining_guests: '2',
    plan: 'black',
    photo_url: 'https://data.whicdn.com/images/341136098/original.jpg',
    address: {
      city: 'Medellin',
      state: 'Antioquia'
  }
  }

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
        <Box className={classes.message}>
            <Typography variant="h4" align="center" style={{margin:20}}>
              Busca la información del usuario con su documento
            </Typography>
          </Box>
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
              <TextField
                fullWidth={true}
                value={userDocument}
                onChange={handleChange}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      
                        <SearchIcon />                      
                        
                    </InputAdornment>
                  )
                }}
                placeholder="Documento"
                variant="outlined"
            />
            <div style={{display:'flex', justifyContent:'center'}}>
                <Button variant="contained" color="primary" className={classes.button} onClick={handleFetchUser}>
                    Buscar
                </Button>            
            </div>
          </Box>
        </PerfectScrollbar>
        </Card>
      </Fade>
      <DialogUser show={showDialogUser} onClose={() => { setShowDialogUser(false) }} user={user}/>

 </>
  );
};

export default SearchUser;
