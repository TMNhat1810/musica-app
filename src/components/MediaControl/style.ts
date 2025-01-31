import { SxProps, Theme } from '@mui/material';

interface MediaControlStyle {
  container: SxProps<Theme>;
}

export const styles: MediaControlStyle = {
  container: {
    display: 'flex',
    flex: 1,
  },
};
