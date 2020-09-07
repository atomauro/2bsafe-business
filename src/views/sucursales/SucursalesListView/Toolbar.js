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
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained" endIcon={<AddCircleIcon />}>
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
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
