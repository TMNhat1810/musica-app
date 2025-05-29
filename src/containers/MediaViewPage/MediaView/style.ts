import { SxProps, Theme } from '@mui/material';

interface MediaViewStyle {
  container: SxProps<Theme>;
}

export const styles: MediaViewStyle = {
  container: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
};
