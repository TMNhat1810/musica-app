import { SxProps, Theme } from '@mui/material';

interface HeaderStyle {
  container: SxProps<Theme>;
}

export const styles: HeaderStyle = {
  container: {
    display: 'flex',
    width: '100vw',
    justifyContent: 'space-between',
    padding: '0px 16px',
    alignItems: 'center',
  },
};
