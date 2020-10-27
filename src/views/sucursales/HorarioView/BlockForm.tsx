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
            aforo: 0,          
          }}
          
          onSubmit={(form: any, actions: any) => {
            if(form.desde==='' || form.hasta===''){
              alert('Revisa los campos')
            } else{
              console.log(form)
              props.saveBlock(JSON.stringify(form), props.day)
            }
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

              <Box flexDirection="row" display="flex" style={{marginBottom:14}}>
              <Box flexDirection='column' display="flex" justifyContent="center">
              <Typography variant="h5" align="center">
                    Aforo
                  </Typography>
                  <TextField
                    error={Boolean(touched.aforo && (errors.aforo))}
                    fullWidth={true}
                    helperText={touched.aforo && (errors.aforo)}
                    placeholder={values.aforo.toString()}
                    margin="normal"
                    name="aforo"                                
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="number"
                    value={values.aforo}
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
