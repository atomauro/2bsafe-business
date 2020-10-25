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

import SearchIcon from '@material-ui/icons/Search'
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

const SearchUser = ({
  className,
  credentials,
  ...rest
}: {
  className: any;
  credentials: any;
}) => {
  const classes = useStyles();

  const [userDocument, setUserDocument] = useState('');
  const [showDialogUser, setShowDialogUser] = useState(false);
  const [isLoading, setisLoading] = useState(false)

  const [userInfo, setUserInfo] = useState({} as any);

  const fetchUserInfo = (documentid: string) => {
    api(credentials).then(async API2BSafe => {
      let response = await API2BSafe.users?.login(documentid);
      if (response && response.authToken) {
        response = await API2BSafe.users?.info(response.authToken);
        console.log(response)
        setisLoading(false)
         setUserInfo(response);
         setShowDialogUser(true)
      }
      if(response?.error){
        console.log(response.error)
        setisLoading(false)
        alert('Usuario no encontrado, intentalo de nuevo')
      }
    });
  };

const handleFetchUser = () => {
  setisLoading(true)
  fetchUserInfo(userDocument)  
  }
  
  const handleChange = (e: any) => {
    setUserDocument(e.target.value)
    console.log("SEARCH USER:",e.target.value)
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
                style={{marginTop:20, marginBottom:20}}
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
      <DialogUser show={showDialogUser} onClose={() => { setShowDialogUser(false) }} user={userInfo}/>
      <Backdrop className={classes.backdrop} open={isLoading} onClick={()=>{console.log('dont close')}}>
        <CircularProgress color="inherit" />
      </Backdrop>
 </>
  );
};

export default SearchUser;
