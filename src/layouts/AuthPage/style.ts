import { SxProps, Theme } from '@mui/material';

interface AuthPageLayoutStyle {
  container: SxProps<Theme>;
  contentContainer: SxProps<Theme>;
  sidePanel: SxProps<Theme>;
  formContainer: SxProps<Theme>;
}

export const styles: AuthPageLayoutStyle = {
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    display: 'flex',
    minWidth: '600px',
    backgroundColor: 'background.paper',
    borderRadius: '10px 10px 10px 10px',
    gap: '20px',
  },
  sidePanel: {},
  formContainer: {},
};
