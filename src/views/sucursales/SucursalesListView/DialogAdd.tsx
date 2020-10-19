import React, { useState, useRef } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  Button,
  Fade,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControlLabel
} from '@material-ui/core';
import MuiCheckbox from '@material-ui/core/Checkbox';

import Lottie from 'react-lottie';

import * as animationData from '../../../assets/lotties/ubicacion2.json';

import * as Yup from 'yup';
import { Formik, useField, Field } from 'formik';
import { AnyARecord } from 'dns';

export const Checkbox = ({ ...props }) => {
  const [field] = useField(props.name);

  return <MuiCheckbox {...field} checked={field.value} />;
};

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    flexGrow: 1
  }
});
const IndexDialogAddSucursal = ({
  open,
  handleClose,
  handleAddSucursal,
  ...rest
}: {
  open: boolean;
  handleClose: any;
  handleAddSucursal: any;
}) => {
  const [error, setError] = useState(false);

  const defaultOptions = {
    loop: false,
    animationData
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">AGREGAR SUCURSAL</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Ingresa la siguiente información de la sucursal, esta será desplegada
          para los usuarios de la encuesta
        </DialogContentText>
        <Formik
          initialValues={{
            nameid: '',
            name: '',
            address: '',
            location: '',
            schedule: '...',
            needSchedule: false
          }}
          validationSchema={Yup.object().shape({
            nameid: Yup.string().required('Requerido'),
            name: Yup.string().required('Requerido'),
            address: Yup.string().required('Requerido'),
            location: Yup.string()
              .max(255)
              .required('Requerido'),
            needSchedule: Yup.boolean().required('Requerido')
          })}
          onSubmit={async (form: any, actions: any) => {
            if (await handleAddSucursal(form)) {
              handleClose();
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
              <TextField
                error={Boolean(touched.nameid && (errors.nameid || error))}
                fullWidth={true}
                helperText={touched.nameid && (errors.nameid || error)}
                label="Usuario de la Sucursal - minusculas sin espacios Ej: milladeoro"
                margin="normal"
                name="nameid"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.nameid}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.name && (errors.name || error))}
                fullWidth={true}
                helperText={touched.name && (errors.name || error)}
                label="Nombre de la Sucursal - Ej: Milla de oro"
                margin="normal"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.name}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.address && (errors.address || error))}
                fullWidth={true}
                helperText={touched.address && (errors.address || error)}
                label="Dirección de la Sucursal - Ej: Carrera 88 # 44 - 80"
                margin="normal"
                name="address"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.address}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.location && (errors.location || error))}
                fullWidth={true}
                helperText={touched.location && (errors.location || error)}
                label="Locación de la Sucursal - Ej: Antioquia, Medellin"
                margin="normal"
                name="location"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.location}
                variant="outlined"
              />
              <Typography variant="body1" color="textPrimary">
                <Field
                  type="checkbox"
                  name="needSchedule"
                  style={{ width: 20, height: 20, marginLeft:5, marginBottom:3 }}
                />
                Necesita Reserva?
              </Typography>

              <DialogActions>
                <Button
                  color="primary"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
<<<<<<< HEAD
                  Cambiar
=======
                  Agregar
>>>>>>> d22ab7b014e30d195bb7eda133c73e20800d0de7
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default IndexDialogAddSucursal;
