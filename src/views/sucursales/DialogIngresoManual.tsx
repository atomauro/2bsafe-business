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
  InputAdornment,
  Input
} from '@material-ui/core/';
import IconCopy from '@material-ui/icons/FileCopyRounded';
import copy from "copy-to-clipboard"; 
import {Img} from 'react-image'
import Lottie from 'react-lottie';
import animationData from '../../assets/lotties/temperature.json';

import api from '../../api/api'

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

export default function DialogIngresoManual({
  show,
  onClose,  
  onChange,
  onClick,
    ...rest
  }: {
    show: boolean, 
    onClose: any,
    onChange: any,
    onClick:any,
  }) {

  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(false)
  const [temperature, setTemperature] = useState('')

  const handleChangeTemperature = (e: any) => {
    setTemperature(e.target.value)
  }

  const defaultOptions = {
    loop: true,      
    animationData,
  };

  return (
    <div>
      <Dialog
        open={show}
        keepMounted={true}
        onClose={()=>{onClose()}}
        aria-labelledby="form-dialog-deletesucur"
      >
        <DialogTitle id="form-dialog-deletesucur">          
          INGRESO MANUAL
        </DialogTitle>
        <form noValidate={true}>    
        <DialogContent style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <Grid direction="column">
            <Lottie options={defaultOptions} height={200} width={"auto"} style={{marginBottom:10}}/>
            <DialogContentText>
            Introduce la temperatura del alumno para validar la reserva
            </DialogContentText>
            <TextField
              autoFocus={true}
              margin="dense"
              id="temp"
              label="Temperatura (°C)"
              type="number"
              fullWidth={true}
                onChange={(event: any) => {
                  handleChangeTemperature(event)
                  onChange(event)
                }}
              value={temperature}
              variant="outlined"
            />
          </Grid>
                    
            
        </DialogContent>
        <DialogActions style={{display:'flex',justifyContent:'center'}}>        
        <Button color="primary" variant='outlined' onClick={() => { onClose() }}>
              Cerrar
          </Button>
          <Button color="primary" variant='contained' disabled={isLoading} onClick={() => { if (temperature === '') { 
                alert("Debes introducir una temperatura válida")
              }
              else {
                onClick()
              }}}>
              Ingresar
          </Button>
        </DialogActions>
        </form>

      </Dialog>
    </div>
  );
}

