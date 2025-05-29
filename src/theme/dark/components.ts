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
  MuiButton: {
    styleOverrides: {
      root: {
        '&.Mui-disabled': {
          color: 'gray',
        },
      },
    },
  },
  MuiSnackbar: {
    styleOverrides: {
      root: {
        '& .MuiSnackbarContent-root': {
          backgroundColor: '#252728',
          color: '#42a5f5',
          borderRadius: 5,
          boxShadow: 5,
          fontWeight: 'bold',
        },
      },
    },
  },
};
