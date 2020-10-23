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
  IconButton,
  Backdrop,
  CircularProgress,
  Fade
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import DialogUser from '../DialogUser'


import { AccessTokenContext } from '../../../App';
import SearchField from '../../../components/SearchField';
import { SearchFieldContext } from '.';
import api from '../../../api/api';

const useStyles = makeStyles(theme => ({
  root: {},
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
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
  const [isLoading, setisLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({} as any);
  const [page, setPage] = useState(0);

  const fetchUserInfo = (documentid: string) => {
    api(credentials).then(async API2BSafe => {
      let response = await API2BSafe.users?.login(documentid);
      if (response && response.authToken) {
        response = await API2BSafe.users?.info(response.authToken);
        console.log(response)
        setisLoading(false)
         setUserInfo(response);
         setShowDialogUser(true)
      }
      if(response?.error){
        console.log(response.error)
        setisLoading(false)
        alert('Usuario no encontrado, intentalo de nuevo')
      }
    });
  };

  const handleFetchUser = (documento: string) => {
    console.log('Fetching user', documento)
    setisLoading(true)
    fetchUserInfo(documento)  
    }

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
                  <StyledTableCell>Ver Perfil</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>

                {FINAL_LIST &&
                  FINAL_LIST.map((sucursal: any) => {
                    const isoStringToDiaHora = (isoDateString: string) => {
                      const response: any = {};
                      if(isoDateString!==undefined){
                        response.dia = isoDateString.substring(0, 10);
                        response.hora = isoDateString.substring(11, 16);
                      }
                      return response;
                    };

                    const { dia, hora } = isoStringToDiaHora(sucursal.date);

                    return (
                      <StyledTableRow
                        key={sucursal.id}                        
                      >
                        <StyledTableCell>{sucursal.id}</StyledTableCell>
                        <StyledTableCell>{sucursal.name}</StyledTableCell>
                        <StyledTableCell>{sucursal.documentid}</StyledTableCell>
                        <StyledTableCell>{dia}</StyledTableCell>
                        <StyledTableCell>{hora}</StyledTableCell>
                        {sucursal.temperature && (
                          <StyledTableCell>
                            {sucursal.temperature}
                          </StyledTableCell>
                        )}
                        <StyledTableCell>[OK]</StyledTableCell>
                        <StyledTableCell>
                          <IconButton onClick={() => {
                          handleFetchUser(sucursal.documentid);
                        }}>
                            <AccountCircle/>
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <DialogUser show={showDialogUser} onClose={() => { setShowDialogUser(false) }} user={userInfo}/>

      <Backdrop className={classes.backdrop} open={isLoading} onClick={()=>{console.log('dont close')}}>
        <CircularProgress color="inherit" />
      </Backdrop>
      </Card>
    </Fade>
  );
};

export default GenericList;
