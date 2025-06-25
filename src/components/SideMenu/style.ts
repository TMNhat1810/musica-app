import { SxProps, Theme } from '@mui/material';

interface SideMenuStyle {
  container: SxProps<Theme>;
  collapseButton: SxProps<Theme>;
}

export const styles: SideMenuStyle = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    top: 64,
    height: '100%',
    minWidth: '100px',
  },
  collapseButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '80%',
    textAlign: 'center',
    minWidth: '60px',
  },
};
