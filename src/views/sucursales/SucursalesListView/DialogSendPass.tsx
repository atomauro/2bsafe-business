import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Lottie from 'react-lottie';
import * as animationData from '../../../assets/lotties/new-pass.json';

export default function DialogChangePass({
  show,
  onClose,
  onChange,
  onClick,
    ...rest
  }: {
      show: boolean,
      onClose: any,
      onChange: any,
      onClick:any,
  }) {
    const defaultOptions = {
      loop: false,
      animationData
  };
  
  const [email, setEmail] = useState('');

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value)
  }

  return (
    <div>
      <Dialog
        open={show}
        onClose={()=>{onClose()}}
        aria-labelledby="form-dialog-changepass"
      >
        <DialogTitle id="form-dialog-changepass">Enviar clave</DialogTitle>
        <form noValidate={true}>        
        <DialogContent>
          <DialogContentText  >
            Introduce a continuación un correo electrónico donde se enviaran las nuevas credenciales para la sucursal
          </DialogContentText>
          <Lottie options={defaultOptions} height={200} width={200} />
          <TextField
            autoFocus={true}
            margin="dense"
            id="newpass"
            label="Correo electrónico"
            type="email"
            fullWidth={true}
              onChange={(event: any) => {
                handleChangeEmail(event)
                onChange(event)
              }}
            required={true}
            value={email}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => { onClose() }}>
            Cancelar
          </Button>
            <Button color="primary" variant='outlined' onClick={() => {
              if (email === '') { 
                alert("Debes introducir un correo eléctronico válido")
              }
              else {
                onClick()
              }
            }}>
            Cambiar
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
