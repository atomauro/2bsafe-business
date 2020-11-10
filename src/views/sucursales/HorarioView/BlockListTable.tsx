import React, { useEffect, useState } from 'react';

import {
  ListItem,
  ListItemSecondaryAction,
  List,
  ListItemText,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Card,
  Box,
  TableRow,
  makeStyles,
  withStyles
} from '@material-ui/core';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';

import DeleteIcon from '@material-ui/icons/Delete';
import NoHayBloques from './NoHayBloques';

const parseStringToBlockObject = (blockTag: string, aforoMaximo: number) => {
  return {
    desde: blockTag.slice(0, 4),
    hasta: blockTag.slice(6, 10),
    aforoMaximo
  };
};

const useStyles = makeStyles(theme => ({
  root: { width: '100%' },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  textField: {
    margin: theme.spacing(2),
    width: 200
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
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

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const BlockListTable = (props: any) => {
  const classes = useStyles();

  const [blocks, setBlocks] = useState(
    props.blocks.filter((blockInfo: any) => blockInfo.blockTag !== 'NH').sort()
  );

  useEffect(() => {
    console.log('BLOCKS BEFORE UPDATED', blocks)
    setBlocks(
      props.blocks.filter((blockInfo: any) => blockInfo.blockTag !== 'NH').sort()
    );
    console.log('BLOCKS UPDATED', blocks);
  }, [props.blocks]);

  return (
    <>
      {!blocks || (blocks && blocks.length === 0) ? (
        <NoHayBloques />
      ) : (
        <Card className={classes.root}>
          <PerfectScrollbar>
            <Box width="100%">
              <Table stickyHeader={true}>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>#</StyledTableCell>
                    <StyledTableCell>Desde</StyledTableCell>
                    <StyledTableCell>Hasta</StyledTableCell>
                    <StyledTableCell>Aforo</StyledTableCell>
                    <StyledTableCell>Eliminar</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {blocks.map((blockInfo: any, index: number) => {
                    const blockObject = parseStringToBlockObject(
                      blockInfo.blockTag,
                      blockInfo.aforoMaximo
                    );
                    return (
                      <StyledTableRow key={blockInfo}>
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell>
                          {blockObject.desde.slice(0, 2) +
                            ':' +
                            blockObject.desde.slice(2, 4)}
                        </StyledTableCell>
                        <StyledTableCell>
                          {blockObject.hasta.slice(0, 2) +
                            ':' +
                            blockObject.hasta.slice(2, 4)}
                        </StyledTableCell>
                        <StyledTableCell>
                          {blockObject.aforoMaximo}
                        </StyledTableCell>
                        <StyledTableCell>
                          <IconButton
                            aria-label="Delete"
                            onClick={() => {
                              props.deleteBlock(
                                props.dateTag,
                                blockInfo.blockTag
                              );
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
        </Card>
      )}
    </>
  );
};

export default BlockListTable;
