import React, {
    useContext,
    useEffect,
    useState,
    createContext,
    useReducer
  } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { Container, makeStyles, Grid, Typography, Fade } from '@material-ui/core';
  import Page from '../../../components/Page';
 
  
  import { AccessTokenContext, UserNameContext } from '../../../App';
  import api from '../../../api/api';
  import State from '../../../reducers/State';
  
  import Horario from './Horario';
  
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
  
  const HorarioView = (props:any) => {
    const { accessTokenState, accessTokenDispatch } = useContext(
      AccessTokenContext
    );
    const { userNameState, userNameDispatch } = useContext(UserNameContext);
    const [Api2BSafe, setApi2BSafe] = useState(null as any);
    const classes = useStyles();

    

    
    return (  
        <Page className={classes.root} title="Sucursales">
          <State state={{ dashboard2bsafeAccessToken: accessTokenState }} />
        <Container maxWidth={false} className={classes.container}>
            <Grid
              container={true}
              direction="column"
              justify="center"
              alignItems="center"
            >                  
             <Horario 
             className={classes.searchUser} 
              credentials={{
                      email: userNameState,
                      accessToken: accessTokenState
                    }}/>
            </Grid>
          </Container>
        </Page>
    );
  };
  
  export default HorarioView;
  