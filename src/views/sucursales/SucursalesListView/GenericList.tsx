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
  root: {}
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

const GenericList = ({
  className,
  lista,
  sucursalSelected,
  isReserva,
  ...rest
}: {
  className: any;
  lista: any[];
  sucursalSelected: string;
  isReserva: boolean;
}) => {
  const classes = useStyles();

  const { searchFieldState } = useContext(SearchFieldContext);

  const FINAL_LIST = searchFieldState
    ? lista.filter(value => {
        console.log('value', value);
        return (
          String(value.documentid).search(searchFieldState.toLowerCase()) !== -1
        );
      })
    : lista;

  return (
    <Fade
      in={true}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={{ enter: 500, exit: 500 }}
    >
      <Card className={clsx(classes.root, className)} {...rest}>
        <SearchField isSucursales={false} />
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
                  {!isReserva && <StyledTableCell>Temperatura</StyledTableCell>}
                  <StyledTableCell>Encuesta</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {FINAL_LIST &&
                  FINAL_LIST.map((sucursal: any) => {
                    const isoStringToDiaHora = (isoDateString: string) => {
                      const response: any = {};
                      response.dia = isoDateString.substring(0, 10);
                      response.hora = isoDateString.substring(11, 16);
                      return response;
                    };

                    const { dia, hora } = isoStringToDiaHora(sucursal.date);

                    return (
                      <StyledTableRow key={sucursal.id}>
                        <StyledTableCell>{sucursal.id}</StyledTableCell>
                        <StyledTableCell>{sucursal.name}</StyledTableCell>
                        <StyledTableCell>{sucursal.documentid}</StyledTableCell>
                        <StyledTableCell>{dia}</StyledTableCell>
                        {sucursal.temperature && (
                          <StyledTableCell>
                            {sucursal.temperature}
                          </StyledTableCell>
                        )}
                        <StyledTableCell>{hora}</StyledTableCell>
                        <StyledTableCell>[OK]</StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
    </Fade>
  );
};

export default GenericList;
