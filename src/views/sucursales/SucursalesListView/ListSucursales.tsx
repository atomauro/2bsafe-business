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
  ...rest
}: {
  className: any;
  empresa: string;
  lista: string[];
}) => {
  const classes = useStyles();
  const [passVisible, setPassVisible] = useState(
    new Array(lista.length).fill(false)
  );
  const { searchFieldState } = useContext(SearchFieldContext);

   const handleClickReservas = (sucur:any) => {
    console.log(sucur)
  }

  const FINAL_LIST = searchFieldState
    ? lista.filter(value => value.search(searchFieldState.toLowerCase()) !== -1)
    : lista;

  return (
  <>
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
                        <ReservaIcon onClick={()=>{console.log(sucursal)}}/>
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell>
                      <IconButton color="primary" aria-label="Ver Ingresos">
                        <IngresoIcon />
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
    </>
  );
};

export default ListSucursales;
