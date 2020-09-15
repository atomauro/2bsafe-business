import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  withStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#F96332',
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const ListSucursales = ({ className, lista, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box width="100%">
          <Table stickyHeader>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Ubicacion</StyledTableCell>
                <StyledTableCell>Usuario</StyledTableCell>
                <StyledTableCell>Clave</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

ListSucursales.propTypes = {
  className: PropTypes.string,
  lista: PropTypes.array.isRequired
};

export default ListSucursales;
