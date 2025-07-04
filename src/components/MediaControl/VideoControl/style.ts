import { SxProps, Theme } from '@mui/material';

interface VideoControlStyle {
  container: SxProps<Theme>;
}

export const styles: VideoControlStyle = {
  container: {
    position: 'relative',
    backgroundColor: 'background.default',
  },
};
