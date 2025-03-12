import { SxProps, Theme } from '@mui/material';

interface SearchBarStyle {
  container: SxProps<Theme>;
}

export const styles: SearchBarStyle = {
  container: {
    width: '40%',
    minWidth: '300',
  },
};
