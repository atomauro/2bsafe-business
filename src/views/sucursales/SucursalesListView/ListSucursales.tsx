import React, { useState } from 'react';
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
import data from './data';
import { Visibility, VisibilityOff } from '@material-ui/icons';

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
  ...rest
}: {
  className: any;
  lista: any;
}) => {
  const classes = useStyles();
  const [passVisible, setPassVisible] = useState(
    new Array(data.length).fill(false)
  );

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box width="100%">
          <Table stickyHeader={true}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Ubicacion</StyledTableCell>
                <StyledTableCell>Usuario</StyledTableCell>
                <StyledTableCell>Clave</StyledTableCell>
                <StyledTableCell>Mostrar</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.map(sucursal => (
                <StyledTableRow key={sucursal.id.toString()}>
                  <StyledTableCell>{sucursal.location}</StyledTableCell>
                  <StyledTableCell>{sucursal.username}</StyledTableCell>
                  <StyledTableCell>
                    {passVisible[sucursal.id]
                      ? sucursal.password
                      : '**********'}
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => {
                      const temp = [...passVisible];
                      temp[sucursal.id] = !passVisible[sucursal.id];
                      setPassVisible(temp);
                    }}
                  >
                    {passVisible[sucursal.id] ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
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
