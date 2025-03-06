import { Components, CssVarsTheme, Theme } from '@mui/material';

export const components:
  | Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme>
  | undefined = {
  MuiIconButton: {
    styleOverrides: {
      root: {
        color: 'lightgray',
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: { backgroundColor: 'lightgray' },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: { color: 'lightgray' },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        color: 'lightgray',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'lightgray',
          },
        },
      },
    },
    defaultProps: {
      slotProps: { inputLabel: { sx: { color: 'gray' } } },
    },
  },
};
