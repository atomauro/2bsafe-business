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
    ...rest
  }: {
    show: boolean,   
 
        onClose: any,
    qrpath:string,
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
        <DialogContent>
          <Paper elevation={2}>
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
                <Lottie options={defaultOptions} height={200} width={200}                   
                />          
              } 
              onError={()=>{
                console.log('error cargando QR - dialogQR')
                onClose()}}
              onErrorCapture={()=>{
                console.log('error cargando QR - dialogQR')
                onClose()}}
              />
          </Paper>
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
