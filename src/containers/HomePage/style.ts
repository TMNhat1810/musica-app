import { SxProps, Theme } from '@mui/material';

interface HomePageStyle {
  container: SxProps<Theme>;
}

export const styles: HomePageStyle = {
  container: {
    display: 'flex',
    flex: 1,
  },
};
