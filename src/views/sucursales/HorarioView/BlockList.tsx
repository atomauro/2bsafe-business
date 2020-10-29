import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import NoHayBloques from './NoHayBloques';

const parseStringToBlockObject = (blockTag: string, aforoMaximo: number) => {
  return {
    desde: blockTag.slice(0, 4),
    hasta: blockTag.slice(6, 10),
    aforoMaximo
  };
};

const BlockList = (props: any) => (
  <List style={{ width: 300 }}>
    {props.blocks.length === 0 ? (
      <NoHayBloques />
    ) : (
      props.blocks.map((blockInfo: any) => {
        const blockObject = parseStringToBlockObject(
          blockInfo.blockTag,
          blockInfo.aforoMaximo
        );

        return (
          <ListItem key={blockInfo} dense={true} button={true}>
            <ListItemText
              primary={blockObject.desde + ' --> ' + blockObject.hasta}
            />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="Delete"
                onClick={() => {
                  props.deleteBlock(props.dateTag, blockInfo.blockTag);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })
    )}
  </List>
);

export default BlockList;
