import { SxProps, Theme } from '@mui/material';

interface MediaViewPageStyle {
  container: SxProps<Theme>;
  contentContainer: SxProps<Theme>;
}

export const styles: MediaViewPageStyle = {
  container: {
    display: 'flex',
    flex: 1,
    gap: '32px',
  },
  contentContainer: {},
};
