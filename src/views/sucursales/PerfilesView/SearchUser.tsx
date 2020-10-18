import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  makeStyles,
  Fade,
  Button,
  CardContent,
  Typography,
  TextField,
  Paper,   
    Grid,
    InputAdornment,
} from '@material-ui/core';
import SearchField from '../../../components/SearchField';
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
  root: {}
}));


const SearchUserF = ({
  className,
  ...rest
}: {
  className: any;
 
}) => {
  const classes = useStyles();

  return (
    <Fade
      in={true}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={{ enter: 500, exit: 500 }}
    >
      <Card className={clsx(classes.root, className)} {...rest}>       
        <PerfectScrollbar>
          <Box width="100%">          
              <TextField
                fullWidth={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      
                        <SearchIcon />                      
                        
                    </InputAdornment>
                  )
                }}
                placeholder="Documento de usuario"
                variant="outlined"
            />
            <div style={{display:'flex', justifyContent:'center'}}>
                <Button variant="contained" color="primary" style={{margin: 10}}>
                    Buscar
                </Button>            
            </div>
          </Box>
        </PerfectScrollbar>
      </Card>
    </Fade>
  );
};

export default SearchUserF;
