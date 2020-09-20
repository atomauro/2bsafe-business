import { createMuiTheme, colors } from '@material-ui/core';
import { Palette } from '@material-ui/core/styles/createPalette';

import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: '#3BA0F8',
      dark: '#F4F6F8',
      contrastText: '#fff' // button text white instead of black
    },
    secondary: {
      main: colors.indigo[500]
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  typography
});

export default theme;
