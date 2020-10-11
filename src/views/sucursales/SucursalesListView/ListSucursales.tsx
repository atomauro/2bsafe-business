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
  Button,
  Fade,
  IconButton
} from '@material-ui/core';
import ReservaIcon from '@material-ui/icons/AssignmentInd';
import IngresoIcon from '@material-ui/icons/AssignmentTurnedIn';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


import { AccessTokenContext } from '../../../App';
import SearchField from '../../../components/SearchField';
import { SearchFieldContext } from '.';

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

const ListSucursales = ({
  className,
  lista,
  empresa,
  handleShowReservas,
  handleShowIngresos,
  ...rest
}: {
  className: any;
  empresa: string;
  lista: string[];
  handleShowReservas: any;
  handleShowIngresos: any;
}) => {
  const classes = useStyles();

  const { searchFieldState } = useContext(SearchFieldContext);
  
  const handleEditPass = (sucur: string) => {
    console.log('Editar Clave: ' + sucur)
  }
   const handleDeleteSucursal = (sucur:string) => {
    console.log('Eliminar Sucursal: ' + sucur)
  }


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
    <SearchField />
      <PerfectScrollbar>
        <Box width="100%">
          <Table stickyHeader={true}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Nombre Sucursal</StyledTableCell>
                <StyledTableCell>Ver Reservas</StyledTableCell>
                <StyledTableCell>Ver Ingresos</StyledTableCell>
                  <StyledTableCell>Cambiar clave</StyledTableCell>
                  <StyledTableCell>Eliminar</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {FINAL_LIST &&
                FINAL_LIST.map((sucursal: any) => (
                  <StyledTableRow key={sucursal}>
                    <StyledTableCell>{sucursal}</StyledTableCell>
                    <StyledTableCell>
                      <IconButton color="primary" aria-label="Ver Reservas">
                        <ReservaIcon onClick={()=>{handleShowReservas(sucursal)}}/>
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell>
                      <IconButton color="primary" aria-label="Ver Ingresos">
                        <IngresoIcon onClick={()=>{handleShowIngresos(sucursal)}}/>
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell>
                      <IconButton color="primary" aria-label="Ver Ingresos">
                        <EditIcon />
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell>
                      <IconButton color="primary" aria-label="Eliminar sucursal">
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
    </Fade>
  );
};

export default ListSucursales;
