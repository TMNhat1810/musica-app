import { SxProps, Theme } from '@mui/material';

interface AuthControlStyle {
  container: SxProps<Theme>;
}

export const styles: AuthControlStyle = {
  container: {
    height: '56px',
    display: 'flex',
    alignItems: 'center',
  },
};
