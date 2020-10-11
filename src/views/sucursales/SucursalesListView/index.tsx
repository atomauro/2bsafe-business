import React, {
  useContext,
  useEffect,
  useState,
  createContext,
  useReducer
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, makeStyles, Grid } from '@material-ui/core';
import Page from '../../../components/Page';

import Toolbar from './Toolbar';
import data from './data';

import Sucursales from './ListSucursales';
import GenericList from './GenericList';

import { AccessTokenContext } from '../../../App';
import api from '../../../api/api';
import State from '../../../reducers/State';
import SearchFieldReducer from '../../../reducers/SearchField';
import DialogChangePass from './DialogSendPass';
import DialogDelete from './DialogDelete';

export const SearchFieldContext = createContext({} as any);

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#F4F6F8',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  toolBar: { marginTop: 20 },
  sucursales: { marginTop: 20 }
}));

const CustomerListView = ({ empresa }: { empresa: string }) => {
  const [searchField, dispatch] = useReducer(SearchFieldReducer, '');
  const { accessTokenState, accessTokenDispatch } = useContext(
    AccessTokenContext
  );
  const [Api2BSafe, setApi2BSafe] = useState(null as any);
  const [list, setList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [needUpdate, setNeedUpdate] = useState(false);

  const [isReserva, setIsReserva] = useState(false);
  const [showReservaSucursal, setReservaSucursal] = useState('');
  const [showIngresoSucursal, setIngresoSucursal] = useState('');
  const [currentView, setCurrentView] = useState('');

  const [listaReservas, setListaReservas] = useState([]);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [email, setEmail] = useState('');
  const [sucursalForEmailDialog, setSucursalForEmailDialog] = useState('');
  const [sucursalForDeleteDialog, setSucursalForDeleteDialog] = useState('');

  // Son para abrir dialogos
  const handleEditPass = (sucur: string) => {
    console.log('Abrir dialogo Editar Clave: ' + sucur);
    setShowEditDialog(true);
    setSucursalForEmailDialog(sucur);
  };
  const handleDeleteSucursal = (sucur: string) => {
    console.log('Abrir dialogo Eliminar Sucursal: ' + sucur);
    setShowDeleteDialog(true);
    setSucursalForDeleteDialog(sucur);
  };

  // Son para cerrar dialogos
  const handleCloseEditPass = () => {
    setShowEditDialog(false);
  };
  const handleCloseDeleteSucursal = () => {
    setShowDeleteDialog(false);
  };

  // Son para el dialogo de enviar email
  const handleChangeSendPass = (event: any) => {
    setEmail(event.target.value);
  };

  const onClickSendEmail = async () => {
    console.log(
      'Se quiere cambiar la clave de la sucursal: ' +
        sucursalForEmailDialog +
        ' al correo: ' +
        email
    );
    const response = await Api2BSafe.admin.changePassword(
      sucursalForEmailDialog
    );
    console.log('response', response);
    setShowEditDialog(false);
  };

  // Son para el dialogo de eliminar sucursal
  const onClickDeleteSucursal = () => {
    console.log('Se quiere eliminar la sucursal: ' + sucursalForDeleteDialog);
    setShowDeleteDialog(false);
  };

  const classes = useStyles();

  const handleShowReservas = (sucur: string) => {
    console.log('Mostrar Reservas: ' + sucur);
    setReservaSucursal(sucur);
    setIngresoSucursal('');
    setCurrentView(sucur);
    setIsReserva(true);
    setNeedUpdate(true);
  };

  const handleShowIngresos = (sucur: string) => {
    console.log('Mostrar Ingreso: ' + sucur);
    setIngresoSucursal(sucur);
    setReservaSucursal('');
    setCurrentView(sucur);
    setIsReserva(false);
    setNeedUpdate(true);
  };
  const handlePressBack = () => {
    console.log('Atras: ');
    setIngresoSucursal('');
    setReservaSucursal('');
    setCurrentView('');
  };

  const handleToolbarClose = (sucursalName: string) => {
    setDialogOpen(false);
    Api2BSafe.admin.nuevaSucursal(sucursalName).then((response: any) => {
      console.log('response', response);
      setNeedUpdate(true);
    });
  };

  const getReservasList = async (sucursal: string) => {
    return await Api2BSafe.reservas.leerReservas(sucursal);
  };

  useEffect(() => {
    console.log('accessTokenState', accessTokenState);
    if (!Api2BSafe && accessTokenState) {
      api({ empresa, accessToken: accessTokenState })
        .then((apiResult: any) => {
          setApi2BSafe(apiResult);
          setNeedUpdate(true);
        })
        .catch(ex => {
          console.log('ex', ex);
        });
    } else if (!Api2BSafe && !accessTokenState) {
      navigate('/login', {
        replace: true
      });
    } else if (Api2BSafe && Api2BSafe.admin && needUpdate) {
      Api2BSafe.admin
        .leerSucursales()
        .then((sucursales: any) => {
          console.log('sucursales', sucursales);
          if (!sucursales.hasErrors()) {
            setList(sucursales.data);
          }
        })
        .catch((ex: any) => console.log('ex', ex));
      setNeedUpdate(false);
    }
    if (currentView !== '' && needUpdate) {
      getReservasList(currentView).then(response => {
        setListaReservas(response.data);
        setNeedUpdate(false);
      });
    }
  }, [Api2BSafe, list, needUpdate, currentView]);

  return (
    <SearchFieldContext.Provider
      value={{ searchFieldState: searchField, searchFieldDispatch: dispatch }}
    >
      <Page className={classes.root} title="Sucursales">
        <State state={{ accessToken: accessTokenState }} />
        <Container maxWidth={false} className={classes.container}>
          <Grid
            container={true}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Toolbar
              className={classes.toolBar}
              onClose={handleToolbarClose}
              currentView={currentView}
              handlePressBack={handlePressBack}
              isReserva={isReserva}
            />
            {currentView === '' ? (
              <Sucursales
                className={classes.sucursales}
                lista={list}
                empresa={empresa}
                handleShowReservas={handleShowReservas}
                handleShowIngresos={handleShowIngresos}
                handleDeleteSucursal={handleDeleteSucursal}
                handleEditPass={handleEditPass}
              />
            ) : showReservaSucursal === '' ? (
              <GenericList
                className={classes.sucursales}
                lista={listaReservas}
                sucursalSelected={showIngresoSucursal}
                isReserva={isReserva}
              />
            ) : (
              <GenericList
                className={classes.sucursales}
                lista={listaReservas}
                sucursalSelected={showReservaSucursal}
                isReserva={isReserva}
              />
            )}
            <DialogChangePass
              show={showEditDialog}
              onClose={handleCloseEditPass}
              onChange={handleChangeSendPass}
              onClick={onClickSendEmail}
            />
            <DialogDelete
              show={showDeleteDialog}
              onClose={handleCloseDeleteSucursal}
              onClick={onClickDeleteSucursal}
            />
          </Grid>
        </Container>
      </Page>
    </SearchFieldContext.Provider>
  );
};

export default CustomerListView;
