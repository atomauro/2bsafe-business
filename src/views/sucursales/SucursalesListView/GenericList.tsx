import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
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
  withStyles,
  Fade
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { AccessTokenContext } from '../../../App';
import SearchField from '../../../components/SearchField';
import { SearchFieldContext } from '.';

const useStyles = makeStyles(theme => ({
  root: {},  
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

const GenericList = ({
  className,
  lista,
  sucursalSelected,
  isReserva,
  ...rest
}: {
  className: any;
  lista: string[];
    sucursalSelected: string;
    isReserva: boolean;
}) => {
  const classes = useStyles();  
    
  const { searchFieldState } = useContext(SearchFieldContext);

  const FINAL_LIST = searchFieldState
    ? lista.filter(value => value.search(searchFieldState.toLowerCase()) !== -1)
    : lista;

  return (
  <Fade
      in={true}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={{ enter: 500, exit: 500 }}
    >
    <Card className={clsx(classes.root, className)} {...rest}>
        {isReserva? <text>Reserva</text>: <text>Ingreso</text>}
        <text>Para la Sucursal{sucursalSelected}</text>
    <SearchField />
      <PerfectScrollbar>
        <Box width="100%">
          <Table stickyHeader={true}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Documento</StyledTableCell>
                <StyledTableCell>Fecha</StyledTableCell>
                <StyledTableCell>Hora</StyledTableCell>
                <StyledTableCell>Temperatura</StyledTableCell>
                <StyledTableCell>Encuesta</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody/>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
    </Fade>
  );
};

export default GenericList;
