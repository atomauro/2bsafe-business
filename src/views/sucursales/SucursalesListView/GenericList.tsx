import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  MenuItem,
  Select,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  withStyles,
  IconButton,
  Backdrop,
  FormControl,
  Grid,
  TextField,
  CircularProgress,
  InputLabel,
  Fade
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import DialogUser from '../DialogUser';

import { Formik } from 'formik';

import { AccessTokenContext } from '../../../App';
import SearchField from '../../../components/SearchField';
import { SearchFieldContext } from '.';
import api from '../../../api/api';

const useStyles = makeStyles(theme => ({
  root: {},
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  textField: {
    margin: theme.spacing(2),
    width: 200
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
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

const GenericList = ({
  className,
  lista,
  sucursalSelected,
  isReserva,
  credentials,
  ...rest
}: {
  className: any;
  lista: any[];
  sucursalSelected: string;
  isReserva: boolean;
  credentials: any;
}) => {
  const classes = useStyles();

  const { searchFieldState } = useContext(SearchFieldContext);
  const [showDialogUser, setShowDialogUser] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({} as any);
  const [page, setPage] = useState(0);

  const [dateFilter, setDateFilter] = useState('');
  const [blockFilter, setBlockFilter] = useState('');
  const [blocks, setBlocks] = useState([] as any[]);
  const [listaFiltradaFechaHora, setListaFiltradaFechaHora] = useState(
    [] as any[]
  );

  const fetchUserInfo = (documentid: string) => {
    api(credentials).then(async API2BSafe => {
      let response = await API2BSafe.users?.login(documentid);
      if (response && response.authToken) {
        response = await API2BSafe.users?.info(response.authToken);
        console.log(response);
        setisLoading(false);
        setUserInfo(response);
        setShowDialogUser(true);
      }
      if (response?.error) {
        console.log(response.error);
        setisLoading(false);
        alert('Usuario no encontrado, intentalo de nuevo');
      }
    });
  };

  const handleFetchUser = (documento: string) => {
    console.log('Fetching user', documento);
    setisLoading(true);
    fetchUserInfo(documento);
  };

  const getCollection = () => {
    // const FINAL_LIST_DATE = lista.filter(elemento=> elemento===dateFilter);
    const aux1 = blockFilter.slice(4) + 'to' + blockFilter.slice(6);
    console.log(aux1);
    // const FINAL_LIST_TIME = FINAL_LIST_DATE.filter(elemento=> elemento===blockFilter);
  };

  const FINAL_LIST = searchFieldState
    ? listaFiltradaFechaHora.filter(value => {
        return (
          String(value.documentid).search(searchFieldState.toLowerCase()) !== -1
        );
      })
    : listaFiltradaFechaHora;

  return (
    <Fade
      in={true}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={{ enter: 500, exit: 500 }}
    >
      <>
        <Card className={clsx(classes.root, className)} {...rest}>
          <Grid container={true}>
            <Grid item={true} lg={6} md={6} xs={12} sm={6}>
              <TextField
                id="date"
                label="Fecha"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={async (e: any) => {
                  const VALUE = e.target.value;
                  const response = await (
                    await api(credentials)
                  ).bloques?.getBloquesByDateTag(
                    sucursalSelected,
                    VALUE.split('-').join('')
                  );
                  if (response.errors.length > 0) {
                    return response;
                  }
                  setBlocks(Object.keys(response.data));
                  setListaFiltradaFechaHora([]);
                  setBlockFilter('');
                  setDateFilter(VALUE);
                }}
                value={dateFilter}
              />
            </Grid>
            <Grid item={true} lg={6} md={6} xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <InputLabel shrink={true} id="label-blocks">
                  Bloques
                </InputLabel>
                <Select
                  id="blocks"
                  label="Bloques"
                  className={classes.textField}
                  value={blockFilter}
                  displayEmpty={true}
                  onChange={async (e: any) => {
                    const BLOCK_TAG = e.target.value;
                    let response: any = await api(credentials);
                    if (isReserva) {
                      response = await response.reservas?.leerReservas(
                        sucursalSelected,
                        dateFilter.split('-').join(''),
                        BLOCK_TAG
                      );
                    } else {
                      response = await response.registros?.leerRegistros(
                        sucursalSelected,
                        dateFilter.split('-').join(''),
                        BLOCK_TAG
                      );
                    }
                    setBlockFilter(BLOCK_TAG);
                    setListaFiltradaFechaHora(
                      response.errors.length > 0 ? [] : response.data
                    );
                  }}
                >
                  {blocks.map((blockTag: any) => (
                    <MenuItem value={blockTag}>{blockTag.slice(0,2) + ':' + blockTag.slice(2,4) + ' hasta ' + blockTag.slice(6,8) + ':' + blockTag.slice(8,10)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Card>
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
                    {!isReserva && (
                      <StyledTableCell>Temperatura</StyledTableCell>
                    )}
                    <StyledTableCell>Encuesta</StyledTableCell>
                    <StyledTableCell>Ver Perfil</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {FINAL_LIST &&
                    FINAL_LIST.map((sucursal: any) => {
                      const isoStringToDiaHora = (isoDateString: string) => {
                        const response: any = {};
                        if (isoDateString !== undefined) {
                          response.dia = isoDateString.substring(0, 10);
                          response.hora = isoDateString.substring(11, 16);
                        }
                        return response;
                      };

                      const { dia, hora } = isoStringToDiaHora(sucursal.date);

                      return (
                        <StyledTableRow key={sucursal.id}>
                          <StyledTableCell>{sucursal.id}</StyledTableCell>
                          <StyledTableCell>{sucursal.name}</StyledTableCell>
                          <StyledTableCell>
                            {sucursal.documentid}
                          </StyledTableCell>
                          <StyledTableCell>{dia}</StyledTableCell>
                          <StyledTableCell>{hora}</StyledTableCell>
                          {sucursal.temperature && (
                            <StyledTableCell>
                              {sucursal.temperature}
                            </StyledTableCell>
                          )}
                          <StyledTableCell>[OK]</StyledTableCell>
                          <StyledTableCell>
                            <IconButton
                              onClick={() => {
                                handleFetchUser(sucursal.documentid);
                              }}
                            >
                              <AccountCircle />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
          <DialogUser
            show={showDialogUser}
            onClose={() => {
              setShowDialogUser(false);
            }}
            user={userInfo}
          />

          <Backdrop
            className={classes.backdrop}
            open={isLoading}
            onClick={() => {
              console.log('dont close');
            }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Card>
      </>
    </Fade>
  );
};

export default GenericList;
