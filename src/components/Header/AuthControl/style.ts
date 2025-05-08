import { SxProps, Theme } from '@mui/material';

interface AuthControlStyle {
  container: SxProps<Theme>;
  authContainer: SxProps<Theme>;
  buttonContainer: SxProps<Theme>;
}

export const styles: AuthControlStyle = {
  container: {
    height: '56px',
    display: 'flex',
    alignItems: 'center',
  },
  authContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1
  },
};
