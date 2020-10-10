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
  withStyles
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

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

  const FINAL_LIST = searchFieldState
    ? lista.filter(value => value.search(searchFieldState.toLowerCase()) !== -1)
    : lista;

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <SearchField />
      <PerfectScrollbar>
        <Box width="100%">
          <Table stickyHeader={true}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Nombre Sucursal</StyledTableCell>
                <StyledTableCell>Ver Reservas</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {FINAL_LIST &&
                FINAL_LIST.map((sucursal: any) => (
                  <StyledTableRow key={sucursal}>
                    <StyledTableCell>{sucursal}</StyledTableCell>
                    <StyledTableCell>
                      <Visibility />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default ListSucursales;
