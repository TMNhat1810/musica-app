import { SxProps, Theme } from '@mui/material';

interface MediaResultStyle {
  container: SxProps<Theme>;
  mediaPannel: SxProps<Theme>;
}

export const styles: MediaResultStyle = {
  container: {
    flex: 1,
  },
  mediaPannel: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 1,
    pt: 1,
    justifyContent: 'space-around',
  },
};
