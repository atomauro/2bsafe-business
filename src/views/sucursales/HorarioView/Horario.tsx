import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  makeStyles,
  Fade,
  Slide,
  Backdrop,
  CircularProgress,
  Typography,
  Select,
  MenuItem,
  Grid
} from '@material-ui/core';

import BlockForm from './BlockForm';
import BlockList from './BlockListTable';
import useBlockState from './useBlockState';

import api from './../../../api/api';

const useStyles = makeStyles(theme => ({
  root: {},
  message: {
    display: 'flex',
    justifyContent: 'center',
    height: 'auto'
  },
  button: {
    margin: 10
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const Horario = ({
  className,
  credentials,
  ...rest
}: {
  className: any;
  credentials: any;
}) => {
  const classes = useStyles();

  const [isLoading, setisLoading] = useState(false);
  const [dayString, setDayString] = useState('');
  const [day, setDay] = useState('');
  const [blocksOfDay, setBlocksOfDay] = useState([] as any[]);
  const [selection, setSelection] = useState('');

  const update = () => {
    changeDay(selection);
  };

  const { blocksDays, addBlock, deleteBlock } = useBlockState({
    credentials,
    update
  });

  useEffect(() => {
    const datStrAux = Object.keys(blocksDays);
    const valueFirstBlock = datStrAux[0].slice(
      datStrAux[0].indexOf('-') + 2,
      datStrAux[0].length
    );

    changeDay(valueFirstBlock);
  }, []);

  const changeDay = (newDaySelection: string): void => {
    setSelection(newDaySelection);

    const dayStringTemp: string = newDaySelection
      .slice(newDaySelection.indexOf('-') + 1, newDaySelection.length)
      .split('/')
      .reverse()
      .join('');

    setDayString(dayStringTemp);
    setDay(newDaySelection);
    getBlocks(dayStringTemp);
  };

  const getBlocks = async (stringDayDate: string) => {
    setBlocksOfDay([]);
    setisLoading(true);
    await api(credentials).then(async API => {
      const response = await API.bloques?.getBloquesByDateTag(
        credentials.email.slice(0, credentials.email.indexOf('@')),
        stringDayDate
          .slice(stringDayDate.indexOf('-') + 1, stringDayDate.length)
          .split('/')
          .reverse()
          .join('')
      );
      console.log({ title: 'getBlocks', response });
      if (response && (!response.errors || response.errors.length === 0)) {
        const newBlocks = Object.keys(response.data || {})
          .sort()
          .map((blockTag: string) => {
            return { blockTag, aforoMaximo: response.data[blockTag] };
          });

        console.log({ title: 'Uploading blocks...' });
        setBlocksOfDay(newBlocks);
      }
      setisLoading(false);
    });
  };

  return (
    <Grid
      container={true}
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
      style={{ marginTop: 20 }}
    >
      <Grid
        container={true}
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item={true} lg={4} md={8} justify="center" alignItems="center">
          <Slide
            direction="down"
            in={true}
            mountOnEnter={true}
            unmountOnExit={true}
            timeout={{ enter: 500, exit: 500 }}
          >
            <Card>
              <Grid
                direction="column"
                container={true}
                style={{ marginBottom: 20, marginRight: 5 }}
              >
                <Grid item={true}>
                  <Box className={classes.message}>
                    <Box flexDirection="column" justifyContent="center">
                      <Typography
                        variant="h4"
                        align="center"
                        style={{ margin: 20 }}
                      >
                        DIA
                      </Typography>
                      <Select
                        id="dia"
                        name="dia"
                        value={day}
                        onChange={async (event: any) => {
                          changeDay(event.target.value || '');
                        }}
                        label="Dia"
                      >
                        {Object.keys(blocksDays).map(dayStr => (
                          <MenuItem
                            value={dayStr.slice(
                              dayStr.indexOf('-') + 2,
                              dayStr.length
                            )}
                          >
                            {dayStr}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Slide>
        </Grid>

        <Grid
          container={true}
          lg={4}
          md={8}
          justify="center"
          alignItems="center"
        >
          <Grid lg={12} md={10}>
            <Slide
              direction="down"
              in={true}
              mountOnEnter={true}
              unmountOnExit={true}
              timeout={{ enter: 500, exit: 500 }}
            >
              <Card className={clsx(classes.root, className)} {...rest}>
                <>
                  <Box flexDirection="column" style={{ marginBottom: 20 }}>
                    <Box className={classes.message}>
                      <Typography
                        variant="h4"
                        align="center"
                        style={{ margin: 20 }}
                      >
                        Edita los bloques para los horarios de reserva
                      </Typography>
                    </Box>

                    <Box className={classes.message}>
                      <BlockForm
                        update={update}
                        saveBlock={async (blockObject: any) => {
                          console.log({ blockObject });
                          addBlock(blockObject, dayString);
                        }}
                      />
                    </Box>
                  </Box>
                </>
              </Card>
            </Slide>
          </Grid>
        </Grid>

        <Grid lg={8} md={10} sm={12} justify="center" alignItems="center">
          <Fade
            in={true}
            mountOnEnter={true}
            unmountOnExit={true}
            timeout={{ enter: 500, exit: 500 }}
          >
            <Card className={clsx(classes.root, className)} {...rest}>
              <PerfectScrollbar>
                <Box
                  width="100%"
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <BlockList
                    dateTag={dayString}
                    blocks={blocksOfDay}
                    deleteBlock={(dateTag: string, blockTag: string) => {
                      deleteBlock(dateTag, blockTag);
                    }}
                  />
                </Box>
              </PerfectScrollbar>
            </Card>
          </Fade>
        </Grid>
      </Grid>

      <Backdrop
        className={classes.backdrop}
        open={isLoading}
        onClick={() => {
          console.log('dont close');
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
};

export default Horario;
