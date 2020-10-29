import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  makeStyles,
  Fade,
  Slide,
  Button,
  CardContent,
  Backdrop,
  CircularProgress,
  Typography,
  TextField,
  Paper,
  Select,
  MenuItem,
  Grid,
  InputAdornment
} from '@material-ui/core';

import DialogUser from '../DialogUser';

import BlockForm from './BlockForm';
import BlockList from './BlockList';
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

  const [showDialogUser, setShowDialogUser] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [dayString, setDayString] = useState('');
  const [day, setDay] = useState('Lunes');
  const [needUpdate, setNeedUpdate] = useState(true);
  const [blocksOfDay, setBlocksOfDay] = useState([] as any[]);

  const { blocksDays, addBlock, deleteBlock } = useBlockState({ credentials });

  useEffect(() => {
    if (needUpdate) {
      setNeedUpdate(false);
      updateBlocks();
      console.log({ blocksOfDay });
    }
  }, [needUpdate, blocksDays]);

  const handleChangeDay = async (event: any) => {
    const stringDayDate: string = event.target.value;
    setDayString(
      stringDayDate
        .slice(stringDayDate.indexOf('-') + 1, stringDayDate.length)
        .split('/')
        .reverse()
        .join('')
    );
    setDay(stringDayDate);
    getBlocks(stringDayDate);
  };

  const updateBlocks = async () => {
    return await getBlocks(
      day
        .slice(day.indexOf('-') + 1, day.length)
        .split('/')
        .reverse()
        .join('')
    );
  };
  const getBlocks = async (stringDayDate: string) => {
    const response = await (
      await api(credentials)
    ).bloques?.getBloquesByDateTag(
      credentials.email.slice(0, credentials.email.indexOf('@')),
      stringDayDate
        .slice(stringDayDate.indexOf('-') + 1, stringDayDate.length)
        .split('/')
        .reverse()
        .join('')
    );
    if (response && (!response.errors || response.errors.length === 0)) {
      const newBlocks = Object.keys(response.data || {}).map(
        (blockTag: string) => {
          return { blockTag, aforoMaximo: response.data[blockTag] };
        }
      );
      console.log({ newBlocks });
      if (newBlocks.join() !== blocksOfDay.join()) {
        setBlocksOfDay(newBlocks);
        setNeedUpdate(true);
      }
    }
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
              <Box
                flexDirection="column"
                style={{ marginBottom: 20, marginRight: 5 }}
              >
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
                      onChange={handleChangeDay}
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
              </Box>
            </Card>
          </Slide>
        </Grid>

        <Grid container={true} lg={4} md={8}>
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
                        saveBlock={async (blockObject: any) => {
                          console.log({ blockObject });
                          await addBlock(blockObject, dayString);
                        }}
                      />
                    </Box>
                  </Box>
                </>
              </Card>
            </Slide>
          </Grid>
        </Grid>

        <Grid lg={8} md={10} justify="center" alignItems="center">
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
                    deleteBlock={async (dateTag: string, blockTag: string) => {
                      await deleteBlock(dateTag, blockTag);
                      setNeedUpdate(true);
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
