import React, { useState, useEffect, useContext, useRef } from 'react';
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
  Typography,
  CircularProgress,
  InputLabel,
  Fab,
  Fade
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import DialogUser from '../DialogUser';

import { Formik } from 'formik';
import DownloadIcon from '@material-ui/icons/GetApp';
import { AccessTokenContext } from '../../../App';
import SearchField from '../../../components/SearchField';
import { SearchFieldContext } from '.';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
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
  selectorField: {
    width: 200
  },
  formControl: {
    minWidth: 120
  },
  downloadIcon: {
    marginRight: theme.spacing(1)
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

  const refFirstItem = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setDateFilter('');
    setBlockFilter('');
    setListaFiltradaFechaHora([]);
  }, [isReserva]);

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

  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (csvData: any, fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Fade
      in={true}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={{ enter: 500, exit: 500 }}
    >
      <>
        <Card className={clsx(classes.root, className)} {...rest}>
          <Grid container={true} style={{ margin: 5 }}>
            <Grid item={true} lg={6} md={6} xs={12} sm={6}>
              <TextField
                id="date"
                label="Fecha"
                type="date"
                className={classes.selectorField}
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
                  setBlocks(Object.keys(response.data).sort());
                  console.log(blocks);
                  setListaFiltradaFechaHora([]);
                  setDateFilter(VALUE);
                  setBlockFilter(Object.keys(response.data)[0]);

                  if (refFirstItem.current !== null) {
                    refFirstItem.current.click();
                    console.log('selecciona primer elemntos');
                  }
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
                      response.errors.length > 0 ? [] : response.data.sort()
                    );
                  }}
                >
                  {blocks.sort().map((blockTag: any, index: number) =>
                    blockTag.slice(0, 2) === 'NH' ? (
                      <MenuItem value={blockTag}>Alumnos sin horario</MenuItem>
                    ) : (
                      <MenuItem value={blockTag}>
                        {blockTag.slice(0, 2) +
                          ':' +
                          blockTag.slice(2, 4) +
                          ' hasta ' +
                          blockTag.slice(6, 8) +
                          ':' +
                          blockTag.slice(8, 10)}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {/* <Box flexDirection="column" justifyContent="center">
                    <Typography
                      variant="body2"
                      align="center"
                      style={{ margin: 5 }}
                    >
                      Generar reporte
                    </Typography>
                    <div style={{display:'flex', justifyContent:'center'}}>
                    <Fab
                      variant="extended"
                      size="small"
                      style={{ backgroundColor: '#FDB825', marginBottom:5 }}
                      aria-label="downlaod"                      
                      onClick={()=>{console.log('download')}}
                    >
                      <DownloadIcon className={classes.downloadIcon} />
                      Descargar
                    </Fab>
                    </div>
                  </Box> */}
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
                        console.log({responseGenericList: response})
                        return response;
                      };

                      const { dia, hora } = isoStringToDiaHora(sucursal.date);

                      
                      console.log({sucursalDate: sucursal})

                      return (
                        <StyledTableRow key={sucursal.id}>
                          <StyledTableCell>{sucursal.id}</StyledTableCell>
                          <StyledTableCell>{sucursal.name}</StyledTableCell>
                          <StyledTableCell>
                            {sucursal.documentid}
                          </StyledTableCell>
                          <StyledTableCell>{dia.slice(0,4)+'/'+dia.slice(4,6)+'/' +dia.slice(6,8)}</StyledTableCell>
                          <StyledTableCell>{(sucursal.time).toString().slice(0,2)+':'+(sucursal.time).toString().slice(2,4)}</StyledTableCell>
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
