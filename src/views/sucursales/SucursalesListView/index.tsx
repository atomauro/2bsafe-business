import React, {
  useContext,
  useEffect,
  useState,
  createContext,
  useReducer
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, makeStyles, Grid, Typography } from '@material-ui/core';
import Page from '../../../components/Page';

import Toolbar from './Toolbar';
import data from './data';

import Sucursales from './ListSucursales';
import GenericList from './GenericList';

import { AccessTokenContext, UserNameContext } from '../../../App';
import api from '../../../api/api';
import State from '../../../reducers/State';
import SearchFieldReducer from '../../../reducers/SearchField';
import DialogChangePass from './DialogSendPass';
import DialogDelete from './DialogDelete';

import emailjs from 'emailjs-com';

import SearchUser from './SearchUser';

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
  sucursales: { marginTop: 20 },
  searchUser: {
    marginTop:20
  }
}));

const CustomerListView = ({ empresa }: { empresa: string }) => {
  const [searchField, dispatch] = useReducer(SearchFieldReducer, '');
  const { accessTokenState, accessTokenDispatch } = useContext(
    AccessTokenContext
  );
  const { userNameState, userNameDispatch } = useContext(UserNameContext);
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

  const [typeUser, setTypeUser] = useState('');

  const name = userNameState.substring(0, userNameState.lastIndexOf('@'));
  const domain = userNameState.substring(userNameState.lastIndexOf('@') + 1);

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
    // ...
    // Send email...
    // ...
    alert('El usuario de esta sucursal es: ' + response.data.sucursal +', y la clave es: ' + response.data.password)
    setShowEditDialog(false);
    sendEmailWithPass(response.data.sucursal, response.data.password)
  };

  const sendEmailWithPass = (sucur: string, password: string) => {
    console.log('Sending email... TO: ' + email + ' para sucursal: ' + sucur + ' con la clave: ' + password)
    const serviceID = 'service_pdisp0p';
    const templateID = 'template_ves4r02';
    const userID = 'user_AKwufQ2kKIuGDO19wuI6h';
    emailjs.send(serviceID, templateID,{
      sucursal: sucur,
      password,
      email,
      }, userID)
      .then(() => {
          alert("Se ha enviado correctamente el correo, revisa por favor incluso en tu carpeta de spam");
      }, (err: any) => {
          // alert(JSON.stringify(err));
          alert("No se ha enviado el correo, revisa la dirección de correo que has ingresado e intentalo de nuevo");
      });
  }

  // Son para el dialogo de eliminar sucursal
  const onClickDeleteSucursal = async () => {
    console.log('Se quiere eliminar la sucursal: ' + sucursalForDeleteDialog);
    await Api2BSafe.admin.eliminarSucursal(sucursalForDeleteDialog);
    setNeedUpdate(true);
    setShowDeleteDialog(false);
  };

  const classes = useStyles();

  const handleAddSucursal = async (sucursalInfo: any) => {
    const INFO = { ...sucursalInfo };
    delete INFO.nameid;
    const response = await Api2BSafe.admin.nuevaSucursal(
      sucursalInfo.nameid,
      INFO
    );
    console.log('RESPONDE ADD SUCURSAL', response);
    return true;
  };

  const handlePressRefresh = () => {
    if (isReserva) {
      console.log('Trying to refresh Reserva data from: ', currentView);
      handleShowReservas(currentView);
    } else {
      console.log('Trying to refresh Ingresos data from: ', currentView);
      handleShowIngresos(currentView);
    }
  };

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

    if (Api2BSafe && Api2BSafe.admin) {
      setTypeUser('admin');
    } else {
      setTypeUser('sucursal');
    }

    if (!Api2BSafe && accessTokenState) {
      api({ email: userNameState, accessToken: accessTokenState })
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
        <State state={{ dashboard2bsafeAccessToken: accessTokenState }} />
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
              handleAddSucursal={handleAddSucursal}
              handlePressRefresh={handlePressRefresh}
              handleShowReservas={handleShowReservas}
              handleShowIngresos={handleShowIngresos}
            />
            {typeUser === 'admin' ? (
              currentView === '' ? (
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
              )
            ) : currentView === '' ? null : showReservaSucursal === '' ? (
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
