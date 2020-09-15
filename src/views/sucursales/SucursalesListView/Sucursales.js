import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  withStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

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

const Sucursales = ({ className, listasucursales, ...rest }) => {
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
            <TableBody>
              {listasucursales.slice(0, limit).map(sucursal=>{

              
                <StyledTableRow key={sucursal
                .id}>
                  <StyledTableCell>
                    <Box alignItems="center" display="flex">
                      <Typography color="textPrimary" variant="body1">
                        {sucursal
                        .location}
                      </Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>{sucursal
                  .username}</StyledTableCell>
                  <StyledTableCell>{sucursal
                  .password}</StyledTableCell>
                </StyledTableRow>
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  listasucursales: PropTypes.array.isRequired
};

export default Sucursales;