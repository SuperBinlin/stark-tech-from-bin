import { createTheme, ThemeOptions } from '@mui/material/styles';

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", sans-serif',
    button: { 
      textTransform: 'none' 
    }
  },
  shape: {
    borderRadius: 8
  }
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: { 
      main: '#0186f4',
      contrastText: '#ffffff'
    },
    secondary: { 
      main: '#dc004e',
      contrastText: '#ffffff'
    },
    background: { 
      default: '#ededed',
      paper: '#ffffff'
    },
    custom: {
      borderColor: '#dfdfdf',
      titleBg: '#fafafa',
    }
  }
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: { 
      main: '#fdeb25',
      contrastText: 'rgba(0, 0, 0, 0.87)'
    },
    secondary: { 
      main: '#ff4081',
      contrastText: 'rgba(0, 0, 0, 0.87)'
    },
    background: { 
      default: '#121212',
      paper: '#1e1e1e'
    },
    custom: {
      borderColor: '#ff0000',
      titleBg: '#fafafa',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.6)'
    }
  }
});

export type AppTheme = typeof lightTheme;