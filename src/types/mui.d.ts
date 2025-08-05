import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      borderColor: string;
      titleBg: string;
    };
  }
  
  interface PaletteOptions {
    custom?: {
      borderColor?: string;
      titleBg?: string;
    };
  }
}