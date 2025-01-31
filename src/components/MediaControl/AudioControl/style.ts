import { SxProps, Theme } from '@mui/material';

interface AudioControlStyle {
  container: SxProps<Theme>;
}

export const styles: AudioControlStyle = {
  container: {
    display: 'flex',
    flex: 1,
  },
};
