import { SxProps, Theme } from '@mui/material';

interface MediaDisplayStyle {
  container: SxProps<Theme>;
  imageContainer: SxProps<Theme>;
  mediaInfoContainer: SxProps<Theme>;
  durationContainer: SxProps<Theme>;
}

export const styles: MediaDisplayStyle = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '280px',
    ':hover': {
      cursor: 'pointer',
    },
  },
  imageContainer: {
    position: 'relative',
  },
  mediaInfoContainer: {
    padding: '2px 4px',
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
  },
  durationContainer: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    zIndex: 100,
  },
};
