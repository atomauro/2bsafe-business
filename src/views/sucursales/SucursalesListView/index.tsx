import React, { useState } from 'react';
import { Box, Container, makeStyles, Grid } from '@material-ui/core';
import Page from '../../../components/Page';

import Toolbar from './Toolbar';
import data from './data';

import Sucursales from './ListSucursales';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#F4F6F8',
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [sucursales] = useState(data);

  return (
    <Page className={classes.root} title="Sucursales">
      <Container
        maxWidth={false}
        className={{ display: 'flex', justifyContent: 'center' }}
      >
        <Toolbar />
        <Sucursales />
      </Container>
    </Page>
  );
};

export default CustomerListView;
