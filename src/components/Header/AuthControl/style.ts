import { SxProps, Theme } from '@mui/material';

interface AuthControlStyle {
  container: SxProps<Theme>;
}

export const styles: AuthControlStyle = {
  container: {
    display: 'flex',
    width: '100vw',
    height: '56px',
  },
};
