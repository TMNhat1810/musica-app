import { SxProps, Theme } from '@mui/material';

interface MainLayoutStyle {
  container: SxProps<Theme>;
}

export const styles: MainLayoutStyle = {
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
  },
};
