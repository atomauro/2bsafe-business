import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  }
}));

export default function DialogUser({
  show,
  onClose,
  ...rest
}: {
  show: boolean;
  onClose: any;
  onConfirmar: any;
}) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={show}
        onClose={() => {
          onClose();
        }}
        aria-labelledby="form-dialog-deletesucur"
      >
        <DialogTitle id="form-dialog-deletesucur">
          AUTORIZACION DE USO DE DATOS PERSONALES
        </DialogTitle>
        <DialogContent>
          <Grid container={true} spacing={2}>
            <Grid item={true} xs={12} md={6}>
              <Typography variant="h6" className={classes.title}>
                Text only
              </Typography>
              <div className={classes.demo}>
                <List>
                  <ListItem>
                    <ListItemText primary="Single-line item" />
                  </ListItem>
                  ,
                </List>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              onClose();
            }}
          >
            CERRAR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
