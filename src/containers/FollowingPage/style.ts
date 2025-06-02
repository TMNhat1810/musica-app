import { SxProps, Theme } from '@mui/material';

interface FollowingPageStyle {
  container: SxProps<Theme>;
  mediaPannel: SxProps<Theme>;
}

export const styles: FollowingPageStyle = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  mediaPannel: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 2,
    pt: 1,
    justifyContent: 'space-around',
  },
};
