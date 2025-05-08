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
    backgroundColor: 'background.paper',
    borderRadius: '10px 10px 10px 10px',
    gap: '20px',
  },
  sidePanel: {
    display: { xs: 'none', sm: 'none', md: 'block' },
  },
  formContainer: {
    px: 2,
    py: 12,
  },
};
