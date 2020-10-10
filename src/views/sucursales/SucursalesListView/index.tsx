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
import { AccessTokenContext } from '../../../App';
import api from '../../../api/api';
import State from '../../../reducers/State';
import SearchFieldReducer from '../../../reducers/SearchField';

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

  const classes = useStyles();

  const handleToolbarClose = (sucursalName: string) => {
    setDialogOpen(false);
    Api2BSafe.admin.nuevaSucursal(sucursalName).then((response: any) => {
      console.log('response', response);
      setNeedUpdate(true);
    });
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
  }, [Api2BSafe, list, needUpdate]);

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
            <Toolbar className={classes.toolBar} onClose={handleToolbarClose} />
            <Sucursales
              className={classes.sucursales}
              lista={list}
              empresa={empresa}
            />
          </Grid>
        </Container>
      </Page>
    </SearchFieldContext.Provider>
  );
};

export default CustomerListView;
