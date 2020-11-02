import React, { useState } from 'react';
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
  Box,
  Avatar,
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

export default function DialogUser({
  show,
  onClose,
  
  user,
    ...rest
  }: {
    show: boolean,   
 
        onClose: any,
    user:any,
  }) {

  const classes = useStyles()

  const copyToClipboard = (str:string) => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };
  
  return (
    <div>
      <Dialog
        open={show}
        onClose={()=>{onClose()}}
        aria-labelledby="form-dialog-deletesucur"
      >
        <DialogTitle id="form-dialog-deletesucur">          
          INFORMACIÓN DE USUARIO
        </DialogTitle>
        <DialogContent>
          <Card>
        <CardHeader
          subheader="Alumno Smartfit"
          title="Perfil"
        />
        <Divider />
          <DialogContentText>
             <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user.photo_url}
          />
          <Typography
            color="textPrimary"
            gutterBottom={true}
            variant="h3"
          >
            {user.name}
          </Typography>
          

          <Box display='flex' flexDirection="row">                
          {user.status==='active'?
                    (<Typography
                    style={{color:'#00FF00'}}
                    variant="h4"
                  >
                      {user.status} 
                    </Typography>):
                
                    (<Typography
                      color="textSecondary"
                    variant="h4"
                  >
                      {user.status} 
                    </Typography>)
                }                
                   

                </Box>
        </Box>          
          </DialogContentText>
             

        <CardContent>
          <Grid
            container={true}
            spacing={2}
          >
            <Grid
              item={true}
              
              md={6}
              xs={12}
            >
              <Grid direction="row" justify="flex-start" alignItems="flex-start" container={true}>
                <Grid item={true}>
                  <TextField
                  fullWidth={true}
                  label="Nombre completo"
                  name="fullname"
                      variant="outlined"
                      disabled={true}
                  value={user.name}
                  className={classes.text}  
                  />
                </Grid>
                <Grid item={true}>
                  
                <Tooltip placement="right" arrow={true} title="Copiar Nombre" >
                  <IconButton onClick={()=>{
                    copy(user.name)
                  }}>
                    <IconCopy />
                  </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={12}
            >
              <Grid direction="row" justify="flex-start" alignItems="flex-start" container={true}>
                <Grid item={true}>
              <TextField
                fullWidth={true}
                label="Genero"
                name="gender"
                type="text"
                variant="outlined"
                    disabled={true}
                    value={user.gender}
                    className={classes.text}
              />
              </Grid>
                <Grid item={true}>
                <Tooltip placement="right" arrow={true} title="Copiar Genero" >
                  <IconButton onClick={()=>{
                    copy(user.gender)
                  }}>
                    <IconCopy />
                  </IconButton></Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={12}
            >
              <Grid direction="row" justify="flex-start" alignItems="flex-start"  container={true}>
                <Grid item={true}>
              <TextField
                fullWidth={true}
                label="Plan"
                name="plan"
                    variant="outlined"
                    disabled={true}
                    value={user.plan}
                    className={classes.text}
              />
              </Grid>
                <Grid item={true}>
                <Tooltip placement="right" arrow={true} title="Copiar Plan" >
                  <IconButton onClick={()=>{
                    copy(user.plan)
                  }}>
                    <IconCopy />
                  </IconButton></Tooltip>
                </Grid>
              </Grid>
            </Grid>
            {
                user.plan==='Digital'?
                (
                  <Grid
              item={true}
              md={6}
              xs={12}
            >
              <Grid direction="row" justify="flex-start" alignItems="flex-start" container={true}>
                <Grid item={true}>
                  <TextField
                    fullWidth={true}
                    label="Próxima anualidad"
                        name="nextanual"
                        value="N/A"
                        variant="outlined"
                        disabled={true}
                        className={classes.text}
                  />
                  </Grid>
                <Grid item={true}>
                <Tooltip placement="right" arrow={true} title="Copiar Pŕoxima Anualidad" >
                  <IconButton onClick={()=>{
                    copy('N/A')
                  }}>
                    <IconCopy />
                  </IconButton></Tooltip>
                </Grid>
              </Grid>
                  </Grid>
                ):
                (
                  <Grid
              item={true}
              md={6}
              xs={12}
            >
              <Grid direction="row" justify="flex-start" alignItems="flex-start" container={true}>
                <Grid item={true}>
                  <TextField
                    fullWidth={true}
                    label="Próxima anualidad"
                        name="nextanual"
                        value={user.main_purchase_expired_at}
                        variant="outlined"
                        disabled={true}
                        className={classes.text}
                  />
                  </Grid>
                <Grid item={true}>
                <Tooltip placement="right" arrow={true} title="Copiar Pŕoxima Anualidad" >
                  <IconButton onClick={()=>{
                    copy(user.main_purchase_expired_at)
                  }}>
                    <IconCopy />
                  </IconButton></Tooltip>
                </Grid>
              </Grid>
                  </Grid>
                )
              }
            <Grid
              item={true}
              md={6}
              xs={12}
            >
              <Grid direction="row" justify="flex-start" alignItems="flex-start" container={true}>
                <Grid item={true}>
              <TextField
                fullWidth={true}
                label="Correo electrónico"
                name="email"                
                variant="outlined"
                value={user.email}
                    disabled={true}
                    className={classes.text}
              />
              </Grid>
                <Grid item={true}>
                <Tooltip placement="right" arrow={true} title="Copiar Email" >
                  <IconButton onClick={()=>{
                    copy(user.email)
                  }}>
                    <IconCopy />
                  </IconButton></Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={12}
            >
              <Grid direction="row" justify="flex-start" alignItems="flex-start" container={true}>
                <Grid item={true}>
              <TextField
                fullWidth={true}
                label="Telefono"
                name="phone"
                type="text"
                variant="outlined"
                    disabled={true}
                    value={user.full_phone}
                    className={classes.text}
              />
              </Grid>
                <Grid item={true}>
                <Tooltip placement="right" arrow={true} title="Copiar Telefono" >
                  <IconButton onClick={()=>{
                    copy(user.full_phone)
                  }}>
                    <IconCopy />
                  </IconButton></Tooltip>
                </Grid>
              </Grid>
            </Grid>
          {user.address!==undefined?
             (
             <>
             <Grid
             item={true}
             md={6}
             xs={12}
           >
              <Grid direction="row" justify="flex-start" alignItems="flex-start" container={true}>
                <Grid item={true}>
             <TextField
               fullWidth={true}
               label="Departamento"
                   name="country"
                   value={user.address.state}
                   variant="outlined"
                   disabled={true}
                   className={classes.text}
             />
             </Grid>
                <Grid item={true}>
                  <Tooltip placement="right" arrow={true} title="Copiar Departamento" >
                  <IconButton onClick={()=>{
                    copy(user.address.state)
                  }}>
                    <IconCopy />
                  </IconButton></Tooltip>
                </Grid>
              </Grid>
           </Grid>
           <Grid
             item={true}
             md={6}
             xs={12}
           >
              <Grid direction="row" justify="flex-start" alignItems="flex-start" container={true}>
                <Grid item={true}>
             <TextField
               fullWidth={true}
               label="Ciudad"
               name="city"                              
                   variant="outlined"
                   disabled={true}
                   value={user.address.city}
                   className={classes.text}
             />
             </Grid>
                <Grid item={true}>
                <Tooltip placement="right" arrow={true} title="Copiar Ciudad" >
                  <IconButton onClick={()=>{
                    copy(user.address.city)
                  }}>
                    <IconCopy />
                  </IconButton></Tooltip>
                </Grid>
              </Grid>
             
               </Grid>
           
               <Grid
             item={true}
             md={6}
             xs={12}
           >
              <Grid direction="row" justify="flex-start" alignItems="flex-start" container={true}>
                <Grid item={true}>
             <TextField
               fullWidth={true}
               label="Dirección"
               name="address"                              
                   variant="outlined"
                   disabled={true}
                   value={user.address.street}
                   className={classes.text}
             />
             </Grid>
                <Grid item={true}>
                <Tooltip placement="right" arrow={true} title="Copiar Dirección" >
                  <IconButton onClick={()=>{
                    copy(user.address.street)
                  }}>
                    <IconCopy />
                  </IconButton></Tooltip>
                </Grid>
              </Grid>
             
               </Grid>
               </>
               ) : null
          }
           
            <Grid
              item={true}
              md={6}
              xs={12}
            >
              <Grid direction="row" justify="flex-start" alignItems="flex-start" container={true}>
                <Grid item={true}>
              <TextField
                fullWidth={true}
                label="Fecha de nacimiento"
                name="birthday"
                type="text"
                variant="outlined"
                    disabled={true}
                    value={user.birthdate}
                    className={classes.text}
              />
              </Grid>
                <Grid item={true}>
                <Tooltip placement="right" arrow={true} title="Copiar Fecha de Nacimiento" >
                  <IconButton onClick={()=>{
                    copy(user.birthdate)
                  }}>
                    <IconCopy />
                  </IconButton></Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={12}
            >
              <Grid direction="row" justify="flex-start" alignItems="flex-start" container={true}>
                <Grid item={true}>
              <TextField
                fullWidth={true}
                label="Invitaciones"
                    name="invitations"
                    value={user.remaining_guests}
                    variant="outlined"
                    disabled={true}
                    className={classes.text}
              />
              </Grid>
                <Grid item={true}>
                <Tooltip placement="right" arrow={true} title="Copiar Invitaciones" >
                  <IconButton onClick={()=>{
                    copy(user.remaining_guests)
                  }}>
                    <IconCopy />
                  </IconButton></Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={12}
            >
                            <Grid direction="row" justify="flex-start" alignItems="flex-start" container={true}>

                <Grid item={true}>
              <TextField
                fullWidth={true}
                label="ID del usuario"
                    name="id"
                    value={user.id}
                    variant="outlined"
                    disabled={true}
                    className={classes.text}
              />
              </Grid>
                <Grid item={true}>
                <Tooltip placement="right" arrow={true} title="Copiar ID" >
                  <IconButton onClick={()=>{
                    copy(user.id)
                  }}>
                    <IconCopy />
                  </IconButton></Tooltip>
                </Grid>
              </Grid>
            </Grid>
            
              
            
          </Grid>
        </CardContent>
        <Divider />
       
      </Card>
          


          
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
