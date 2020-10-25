import React, {useState} from 'react';
import {
  TextField, 
  Button, 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select,
  Fab
} from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import NavigationIcon from '@material-ui/icons/Navigation';
import PlusIcon from '@material-ui/icons/AddCircle'
import * as Yup from 'yup';
import { Formik } from 'formik';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

const BlockForm = ( props: any ) => {

  const classes = useStyles();

  return (
 
    <Formik
    style={{width:'100%'}}
          initialValues={{
            desde: '',
            hasta: '',
            dia:''
          }}
          validationSchema={Yup.object().shape({
            desde: Yup.string().required('Requerido'),
            hasta: Yup.string().required('Requerido'),
           
          })}
          onSubmit={(form: any, actions: any) => {
            console.log(form)
            props.saveBlock(JSON.stringify(form))
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>  
            <Box flexDirection='column' display="flex" justifyContent="center" >                
              <Box flexDirection='column' justifyContent="center" display="flex" style={{marginBottom:14}}>                
                
                  <Select                    
                    id="dia"
                    name="dia"
                    value={values.dia}
                    onChange={handleChange}
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

              <Box flexDirection="row" display="flex" style={{marginBottom:14}}>
                <Box flexDirection='column' display="flex" justifyContent="center" style={{marginRight:20}}>
                  <Typography variant="h5" align="center">
                    Desde
                  </Typography>
                  <TextField
                    error={Boolean(touched.desde && (errors.desde ))}
                    fullWidth={true}
                    helperText={touched.desde && (errors.desde)}
                    placeholder={values.desde.toString()}
                    margin="normal"
                    name="desde"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="time"
                    value={values.desde}
                    variant="outlined"
                  />
                </Box>
                <Box flexDirection='column' display="flex" justifyContent="center">
                <Typography variant="h5" align="center">
                    Hasta
                  </Typography>
                  <TextField
                    error={Boolean(touched.hasta && (errors.hasta))}
                    fullWidth={true}
                    helperText={touched.hasta && (errors.hasta)}
                    placeholder={values.hasta.toString()}
                    margin="normal"
                    name="hasta"
                                
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="time"
                    value={values.hasta}
                    variant="outlined"
                  />
                </Box>
              </Box>

              </Box>
              <Box  alignSelf="flex-end" style={{marginBottom:20}} >
              
                <div style={{display:'flex', justifyContent:'center', marginBottom:10}}>
                  <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        handleSubmit();
                      }}
                      endIcon={<PlusIcon/>}
                    >
                      Agregar
                    </Button>
                </div>  

                <div style={{display:'flex', justifyContent:'center'}}>
                    <Fab
                      variant="extended"
                      size="small"
                      style={{backgroundColor:'#FDB825'}}
                      aria-label="add"
                      className={classes.margin}
                    >
                      <NavigationIcon className={classes.extendedIcon} />
                      Actualizar
                    </Fab>
                </div>                                

                
              </Box>
              
         
          
            </form>
          )}
        </Formik>
      
  );
};

export default BlockForm;
