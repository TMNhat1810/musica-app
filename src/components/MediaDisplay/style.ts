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
    flex: '1 1',
    maxWidth: '100%',
    minWidth: '300px',
    ':hover': {
      cursor: 'pointer',
    },
    gap: 1,
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
    right: 2,
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    borderRadius: 5,
    px: 0.5,
  },
};
