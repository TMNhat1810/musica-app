import { SxProps, Theme } from '@mui/material';

interface ProfilePageStyle {
  container: SxProps<Theme>;
  headerContainer: SxProps<Theme>;
  profileContainer: SxProps<Theme>;
}

export const styles: ProfilePageStyle = {
  container: {},
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    px: '32px',
  },
  profileContainer: {
    display: 'flex',
    gap: '16px',
  },
};
