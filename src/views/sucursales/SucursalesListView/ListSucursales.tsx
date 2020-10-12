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
    backgroundColor: '#FDB825',
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
  handleEditPass,
  handleDeleteSucursal,
  ...rest
}: {
  className: any;
  empresa: string;
  lista: any[];
  handleShowReservas: any;
  handleShowIngresos: any;
  handleEditPass: any;
  handleDeleteSucursal: any;
}) => {
  const classes = useStyles();

  const { searchFieldState } = useContext(SearchFieldContext);

  const FINAL_LIST = searchFieldState
    ? lista.filter(
        value => value.nameid.search(searchFieldState.toLowerCase()) !== -1
      )
    : lista;

  return (
    <Fade
      in={true}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={{ enter: 500, exit: 500 }}
    >
      <Card className={clsx(classes.root, className)} {...rest}>
        <SearchField isSucursales={true} />
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
                    <StyledTableRow key={sucursal.nameid}>
                      <StyledTableCell>{sucursal.nameid}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton color="primary" aria-label="Ver Reservas">
                          <ReservaIcon
                            onClick={() => {
                              handleShowReservas(sucursal.nameid);
                            }}
                          />
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell>
                        <IconButton color="primary" aria-label="Ver Ingresos">
                          <IngresoIcon
                            onClick={() => {
                              handleShowIngresos(sucursal.nameid);
                            }}
                          />
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell>
                        <IconButton
                          color="primary"
                          aria-label="Enviar correo - Cambiar clave"
                        >
                          <EditIcon
                            onClick={() => {
                              handleEditPass(sucursal.nameid);
                            }}
                          />
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell>
                        <IconButton
                          color="primary"
                          aria-label="Eliminar sucursal"
                        >
                          <DeleteIcon
                            onClick={() => {
                              handleDeleteSucursal(sucursal.nameid);
                            }}
                          />
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
