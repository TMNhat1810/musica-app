import { SxProps, Theme } from '@mui/material';

interface ForumPostPannelStyle {
  container: SxProps<Theme>;
}

export const styles: ForumPostPannelStyle = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
  },
};
