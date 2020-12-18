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
import QRIcon from '@material-ui/icons/CropFree';
import IngresoIcon from '@material-ui/icons/ChangeHistoryTwoTone';

import { AccessTokenContext } from '../../../App';
import SearchField from '../../../components/SearchField';
import { SearchFieldContext } from '.';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import api from '../../../api/api';

import DialogQR from '../DialogQR';
import DialogIngresoManual from '../DialogIngresoManual';
import DialogIngresoManualSuccess from '../DialogIngresoManualSuccess';
import DialogIngresoManualFailed from '../DialogIngresoManualFailed';
import DialogIngresoManualTimeout from '../DialogIngresoManualTimeout';

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
  blockstextField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
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

const StyledTableCellIngreso = withStyles(theme => ({
  head: {
    backgroundColor: '#000000',
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
  const [showDialogQR, setShowDialogQR] = useState(false);
  const [showDialogIngresoManual, setShowDialogIngresoManual] = useState(false);
  const [showDialogIngresoManualSuccess, setShowDialogIngresoManualSuccess] = useState(false);
  const [showDialogIngresoManualFailed, setShowDialogIngresoManualFailed] = useState(false);
  const [showDialogIngresoManualTimeout, setShowDialogIngresoManualTimeout] = useState(false);

  // Para Dialogo Visualizar QR
  const [dialogQRpath, setDialogQRpath] = useState('');

  // Para Ingreso Manual
  const [infoReserva, setInfoReserva] = useState({})

  const [isLoading, setisLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({} as any);
  const [page, setPage] = useState(0);

  const [dateFilter, setDateFilter] = useState('');
  const [blockFilter, setBlockFilter] = useState('');
  const [blocks, setBlocks] = useState([] as any[]);
  const [listaFiltradaFechaHora, setListaFiltradaFechaHora] = useState(
    [] as any[]
  );
  const [temperature, setTemperature] = useState('')

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

  const handleChangeBlocks = async (e: any, newDateFilter: string) => {
    const BLOCK_TAG = e.target.value;
    console.log({BLOCK_TAG})
    if(newDateFilter!==''){
      let response: any = await api(credentials);
      if (isReserva) {
        response = await response.reservas?.leerReservas(
          sucursalSelected,
          newDateFilter.split('-').join(''),
          BLOCK_TAG
        );
      } else {
        response = await response.registros?.leerRegistros(
          sucursalSelected,
          newDateFilter.split('-').join(''),
          BLOCK_TAG
        );
      }
      console.log({response})
      setBlockFilter(BLOCK_TAG);
      setListaFiltradaFechaHora(
        response.errors.length > 0 ? [] : response.data.sort()
      );
    }else{
      alert('Selecciona primero una fecha')
    }
  }

  const buscarReserva = (i:string,d:string,t:string,s:string) =>{
    setisLoading(true)
    console.log('Buscar reserva',{
      i,
      d,
      t,
      s
    })
      api(credentials).then(async API2BSafe => {
        const response = await API2BSafe.reservas?.buscarReservaPorId(
              i,
              d,
              t,
              s
          );
        if (response){
          console.log('busqueda exitosa', response)
          setisLoading(false)
          setInfoReserva({...response})
          setShowDialogIngresoManual(true)
        }else{
          console.log('busqueda fallida', response)
          setisLoading(false)
        }
    });
  }

  const intentarRegistro = async () => {
    setShowDialogIngresoManual(false)
    setisLoading(true)
      api(credentials).then(async API2BSafe => {
        const response = await API2BSafe.registros?.nuevoRegistro({...infoReserva, temperature:Number(temperature)}, credentials.email.substring(0, credentials.email.lastIndexOf('@')));
        if (response && response.data){
          console.log('ingreso exitosa', response)
          setisLoading(false)
          setShowDialogIngresoManualSuccess(true)
        }else{
          console.log('ingreso fallida', response)
          setShowDialogIngresoManualFailed(true)
          setisLoading(false)
        }
    });
  }

  const handleChangeTemperature = (e: any) => {
    setTemperature(e.target.value)
  }

  const isLessThanCurrentTime = (dateSelected: Date) => {
    const today = new Date();
    const differenceMilliseconds =
      (dateSelected.getTime() - today.getTime()) * -1;
    const differenceMinutes = Math.floor(differenceMilliseconds / 60000);

    if (differenceMinutes > 30) {
      return true;
    } else {
      return false;
    }
  };

  const isBeforeThanCurrentTime = (dateSelected: Date) => {
    const today = new Date();
    const differenceMilliseconds =
      (dateSelected.getTime() - today.getTime()) * -1;
    const differenceMinutes = Math.floor(differenceMilliseconds / 60000);

    if (differenceMinutes > -60) {
      return true;
    } else {
      return false;
    }
  };

  const constructDate = (dateTag:string,timeTag:string)=>{
    const auxiliarDate = new Date()

    const year=dateTag.slice(0,4)
    const month=dateTag.slice(4,6)
    const day=dateTag.slice(6,8)
    const hour = timeTag.slice(0,2)
    const minutes = timeTag.slice(2,4)

    auxiliarDate.setFullYear(Number(year));
    auxiliarDate.setMonth(Number(month)-1);
    auxiliarDate.setDate(Number(day))
    auxiliarDate.setHours(Number(hour))
    auxiliarDate.setMinutes(Number(minutes))
    console.log({dateTag,timeTag})
    console.log({auxiliarDate, year, month, day, hour, minutes})
    return auxiliarDate
  }

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
                  setListaFiltradaFechaHora([]);
                  setDateFilter(VALUE);
                  setBlockFilter('NH');
                  handleChangeBlocks({target: {value: 'NH'}}, VALUE)
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
                  className={classes.blockstextField}
                  value={blockFilter}
                  displayEmpty={true}
                  onChange={e => handleChangeBlocks(e, dateFilter)}
                >
                  {blocks.sort().map((blockTag: any, index: number) => {

                   return blockTag.slice(0, 2) === 'NH' ? (
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
                  }
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
          {FINAL_LIST?
           <Fade
           in={true}
           mountOnEnter={true}
           unmountOnExit={true}
           timeout={{ enter: 500, exit: 500 }}
         >
          <div style={{width:'100%', height:'auto', display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Typography variant='h4' style={{fontWeight:"bold"}}>Total: {FINAL_LIST.length}</Typography>
          </div>
          </Fade> : null
          }
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
                      <StyledTableCell>Temperatura (°C)</StyledTableCell>
                    )}
                    <StyledTableCell>Encuesta</StyledTableCell>
                    <StyledTableCell>Ver Perfil</StyledTableCell>
                     {isReserva && (
                      <StyledTableCell>Ver QR</StyledTableCell>
                    )} 
                    { credentials.email.substring(credentials.email.lastIndexOf('@') + 1)!=='2bsafe.com'?
                      (isReserva && (
                        <StyledTableCellIngreso>Ingresar </StyledTableCellIngreso>
                      )):null
                    }
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {FINAL_LIST &&
                    FINAL_LIST.sort((a:any,b:any)=>(a.createdat.seconds > b.createdat.seconds) ? 1 : -1).map((sucursal: any) => {
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
                          {sucursal.id && (
                          <StyledTableCell>{sucursal.id}</StyledTableCell>)
                          }
                          {sucursal.name && (
                            <StyledTableCell>{sucursal.name}</StyledTableCell>
                          )}
                          {sucursal.documentid && (
                            <StyledTableCell>
                              {sucursal.documentid}
                            </StyledTableCell>
                          )}
                          <StyledTableCell>{dia.slice(0,4)+'/'+dia.slice(4,6)+'/' +dia.slice(6,8)}</StyledTableCell>
                          {sucursal.time && (
                            <StyledTableCell>
                              {(sucursal.time).toString().slice(0,2)+':'+(sucursal.time).toString().slice(2,4)}
                            </StyledTableCell>
                            )}
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
                                               
                          {isReserva && sucursal!==undefined?
                            (                              
                              <StyledTableCell>
                                <IconButton                              
                              onClick={() => {                               
                               // setDialogQRpath("https://api.smartfitreserva.com/tmp/qrs/qr-" + (sucursal.id).toString() + ".jpg")
                               setDialogQRpath(
                                "https://api.smartfitreserva.com"
                                  + "/tmp/qrs/qr-"
                                  + (sucursal.documentid)
                                  + (dia)
                                  + (sucursal.id)
                                  + ".jpg")                               
                               setShowDialogQR(true)
                              }}
                            >
                              <QRIcon />
                            </IconButton>
                            </StyledTableCell>
                            )
                          : null
                          }     
                          { credentials.email.substring(credentials.email.lastIndexOf('@') + 1)!=='2bsafe.com'?
                              (
                                isReserva && sucursal!==undefined?
                                (                              
                                  <StyledTableCell>
                                    <IconButton                              
                                  onClick={() => {                               
                                  // setDialogQRpath("https://api.smartfitreserva.com/tmp/qrs/qr-" + (sucursal.id).toString() + ".jpg")
                                  
                                  const dateObject = constructDate(sucursal.date, sucursal.time)
                                  
                                  if(!isLessThanCurrentTime(dateObject) && isBeforeThanCurrentTime(dateObject)){
                                    setDialogQRpath(
                                      "https://api.smartfitreserva.com"
                                        + "/tmp/qrs/qr-"
                                        + (sucursal.documentid)
                                        + (dia)
                                        + (sucursal.id)
                                        + ".jpg") 
                                      
                                      buscarReserva(
                                        sucursal.id,
                                        sucursal.date,
                                        blockFilter,
                                        credentials.email.substring(0, credentials.email.lastIndexOf('@')),                               
                                      )
                                  } else{
                                    setShowDialogIngresoManualTimeout(true)
                                  }

                                  
                                  }}
                                >
                                  <IngresoIcon />
                                </IconButton>
                                </StyledTableCell>
                                )
                              : null
                              )  :null
                           }  
                          
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
          <DialogQR
            show={showDialogQR}
            onClose={() => {
              setShowDialogQR(false);
            }}
            QRpath={dialogQRpath}
          />
          <DialogIngresoManual
            show={showDialogIngresoManual}
            onClose={() => {
              setShowDialogIngresoManual(false);
              setTemperature('')
            }}
            onChange={handleChangeTemperature}
            onClick={intentarRegistro}
          />
          <DialogIngresoManualSuccess
            show={showDialogIngresoManualSuccess}
            onClose={() => {
              setShowDialogIngresoManualSuccess(false);
              // Refrescar
            }}
          />
          <DialogIngresoManualFailed
            show={showDialogIngresoManualFailed}
            onClose={() => {
              setShowDialogIngresoManualFailed(false);
            }}
          />
          <DialogIngresoManualTimeout
            show={showDialogIngresoManualTimeout}
            onClose={() => {
              setShowDialogIngresoManualTimeout(false);
            }}
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
