'use client'

import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../theme';

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
}