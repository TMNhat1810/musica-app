import { SxProps, Theme } from '@mui/material';

interface MediaViewPageStyle {
  container: SxProps<Theme>;
}

export const styles: MediaViewPageStyle = {
  container: {
    display: 'flex',
    flex: 1,
  },
};
