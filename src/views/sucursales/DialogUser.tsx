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
  CardContent,
  Divider,
  CardHeader,
  IconButton,
  FormControlLabel,
  InputAdornment
} from '@material-ui/core/';
import IconCopy from '@material-ui/icons/FileCopyRounded';


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
            spacing={3}
          >
            <Grid
              item={true}
              
              md={6}
              xs={12}
            >
              <Grid container={true} spacing={1} alignItems="flex-end">
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
                  <IconButton>
                    <IconCopy />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={12}
            >
              <Grid container={true} spacing={1} alignItems="flex-end">
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
                  <IconButton>
                    <IconCopy />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={12}
            >
              <Grid container={true} spacing={1} alignItems="flex-end">
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
                  <IconButton>
                    <IconCopy />
                  </IconButton>
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
              <Grid container={true} spacing={1} alignItems="flex-end">
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
                  <IconButton>
                    <IconCopy />
                  </IconButton>
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
              <Grid container={true} spacing={1} alignItems="flex-end">
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
                  <IconButton>
                    <IconCopy />
                  </IconButton>
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
              <Grid container={true} spacing={1} alignItems="flex-end">
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
                  <IconButton>
                    <IconCopy />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={12}
            >
              <Grid container={true} spacing={1} alignItems="flex-end">
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
                  <IconButton>
                    <IconCopy />
                  </IconButton>
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
             <Grid container={true} spacing={1} alignItems="flex-end">
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
                  <IconButton>
                    <IconCopy />
                  </IconButton>
                </Grid>
              </Grid>
           </Grid>
           <Grid
             item={true}
             md={6}
             xs={12}
           >
             <Grid container={true} spacing={1} alignItems="flex-end">
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
                  <IconButton>
                    <IconCopy />
                  </IconButton>
                </Grid>
              </Grid>
             
               </Grid>
           
               <Grid
             item={true}
             md={6}
             xs={12}
           >
             <Grid container={true} spacing={1} alignItems="flex-end">
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
                  <IconButton>
                    <IconCopy />
                  </IconButton>
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
              <Grid container={true} spacing={1} alignItems="flex-end">
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
                  <IconButton>
                    <IconCopy />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={12}
            >
              <Grid container={true} spacing={1} alignItems="flex-end">
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
                  <IconButton>
                    <IconCopy />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item={true}
              md={6}
              xs={12}
            >
              <Grid container={true} spacing={1} alignItems="flex-end">
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
                  <IconButton>
                    <IconCopy />
                  </IconButton>
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
