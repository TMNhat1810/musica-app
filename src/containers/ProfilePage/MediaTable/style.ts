import { SxProps, Theme } from '@mui/material';

interface MediaTableStyle {
  container: SxProps<Theme>;
  row: SxProps<Theme>;
}

export const styles: MediaTableStyle = {
  container: {},
  row: {
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },
};
