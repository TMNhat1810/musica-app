import { Components, CssVarsTheme, Theme } from '@mui/material';

export const components:
  | Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme>
  | undefined = {
  MuiIconButton: {
    styleOverrides: {
      root: { color: 'lightgray' },
    },
  },
};
