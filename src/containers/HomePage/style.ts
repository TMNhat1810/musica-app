import { SxProps, Theme } from '@mui/material';

interface HomePageStyle {
  container: SxProps<Theme>;
  mediaPannel: SxProps<Theme>;
}

export const styles: HomePageStyle = {
  container: {
    display: 'flex',
    flex: 1,
  },
  mediaPannel: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 2,
    pt: 1,
    justifyContent: 'space-around',
  },
};
