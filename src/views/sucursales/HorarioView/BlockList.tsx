import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import NoHayBloques from './NoHayBloques';

const BlockList = (props: any ) => (


  <List style={{width:300}}>
    {props.blocks.length===0?
      <NoHayBloques/>:
      (props.blocks.map((block:any, index:number) => {      
        const objeto = JSON.parse(block)
        const desde = objeto.desde
        const hasta = objeto.hasta
  
        return (
        <ListItem key={index.toString()} dense={true} button={true}>        
          <ListItemText primary={desde + ' -->' + hasta} />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Delete"
              onClick={() => {
                props.deleteBlock(index);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}))
    }
    
  </List>
);

export default BlockList;
