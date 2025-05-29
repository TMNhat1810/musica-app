import { SxProps, Theme } from '@mui/material';

interface MediaViewPageStyle {
  container: SxProps<Theme>;
  contentContainer: SxProps<Theme>;
}

export const styles: MediaViewPageStyle = {
  container: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
    flex: 1,
    gap: 5,
    px: 3,
    pt: 2,
  },
  contentContainer: {},
};
