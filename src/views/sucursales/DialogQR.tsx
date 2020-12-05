import React, { useState, useEffect } from 'react';
// AWS
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Paper,
  Box,
  Avatar,
  CircularProgress,
  makeStyles,
  Grid,
  Card,
  Tooltip,
  CardContent,
  Divider,
  CardHeader,
  IconButton,
  FormControlLabel,
  InputAdornment
} from '@material-ui/core/';
import IconCopy from '@material-ui/icons/FileCopyRounded';
import copy from "copy-to-clipboard"; 
import {Img} from 'react-image'
import Lottie from 'react-lottie';
import animationData from '../../assets/lotties/notfoundQR.json';


const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
    marginTop:20
  },
  text: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "#000000" 
    }
  }
}));

export default function DialogQR({
  show,
  onClose,  
  qrpath,
  qrpathalterno,
    ...rest
  }: {
    show: boolean,    
    onClose: any,
    qrpath:string,
    qrpathalterno:string,
  }) {

  const classes = useStyles()

  const defaultOptions = {
    loop: false,      
    animationData,
  };
  
  useEffect(() => {
    console.log("DIALOGQR props", qrpath)
  }, [])

  return (
    <div>
      <Dialog
        open={show}
        onClose={()=>{onClose()}}
        aria-labelledby="form-dialog-deletesucur"
      >
        <DialogTitle id="form-dialog-deletesucur">          
          CODIGO QR DE RESERVA
        </DialogTitle>
        <DialogContent style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          
            <Img 
              src={qrpath} 
              alt={qrpath}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loader={
              <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100%'}}>
                <CircularProgress style={{ color: '#FDB825' }}/>
              </div>
              }
              unloader={
                <Grid 
                  container={true} 
                  justify="center" 
                  alignItems="center" 
                  direction="column"                  
                  >
                 <Grid container={true} justify="center">
                   <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                    <Lottie options={defaultOptions} height={200} width={200}/>                          
                   </div>
                  </Grid> 
                  <Grid container={true} justify="center">
                  <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                    <Button variant="contained" style={{margin:20,color:'#FFFFFF', backgroundColor:'#FDB825'}} onClick={()=>window.open(qrpath, '_blank')}>Ver Aqui</Button>               
                  </div>
                  </Grid> 
                  <Grid container={true} justify="center">
                  <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                    <Button variant="contained" color="primary" style={{marginBottom:20,color:'#FFFFFF'}} onClick={()=>window.open(qrpathalterno, '_blank')}>Link alterno temporal</Button>               
                  </div>
                  </Grid> 
                </Grid>
              } 
              onError={()=>{
                console.log('error cargando QR - dialogQR')
                onClose()}}
              onErrorCapture={()=>{
                console.log('error cargando QR - dialogQR')
                onClose()}}
              />
          
        </DialogContent>
        <DialogActions style={{display:'flex',justifyContent:'center'}}>        
            <Button color="primary" variant='contained' onClick={() => { onClose() }}>
              Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

