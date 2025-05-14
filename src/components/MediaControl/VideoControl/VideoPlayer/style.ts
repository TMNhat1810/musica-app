import { SxProps, Theme } from '@mui/material';

interface VideoPlayerStyle {
  container: SxProps<Theme>;
  controlContainer: SxProps<Theme>;
  progressBarContainer: SxProps<Theme>;
  controlActionContainer: SxProps<Theme>;
  button: SxProps<Theme>;
  cover: SxProps<Theme>;
}

export const styles: VideoPlayerStyle = {
  container: {
    position: 'relative',
    backgroundColor: 'background.default',
    display: 'block',
    lineHeight: 0,
  },
  controlContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    zIndex: 50,
    bottom: 0,
    pb: 1.5,
    pt: 4,
    px: 1,
    borderBottomWidth: 0,
    backgroundColor: 'background.default',
    background: 'linear-gradient(0deg,rgba(18,18,18,1) 0%, rgba(18,18,18,0) 100%)',
  },
  progressBarContainer: {
    width: '100%',
    px: 1,
    display: 'flex',
    alignItems: 'flex-end',
    position: 'absolute',
    top: 4,
  },
  controlActionContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    '&:focus, &:active, &:hover': {
      outline: 'none',
      border: 'none',
    },
  },
  cover: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
};
