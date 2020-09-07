import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  colors,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Lottie from 'react-lottie';

import * as animationData from '../../../assets/lotties/ubicacion2.json';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          color="primary"
          variant="contained"
          endIcon={<AddCircleIcon />}
          onClick={handleClickOpen}
        >
          Agregar sucursal
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <div align="center">
              <Box maxWidth={500} className={classes.message}>
                <Typography variant="h4">
                  Desde aqui puedes agregar las sucursales y visualizar las
                  claves generadas
                </Typography>
              </Box>
            </div>
          </CardContent>
        </Card>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">AGREGAR SUCURSAL</DialogTitle>
        <DialogContent>
          <Lottie options={defaultOptions} height={400} width={400} />
          <DialogContentText>
            Para agregar una nueva sucursal o sede, solo es necesario ingresar a
            continuacion el nombre o la ubicacion del establecimiento, utilice
            una o dos palabras para hacerlo. Ejemplo: Poblado, Sede Poblado.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre sucursal"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Agregar sucursal
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
