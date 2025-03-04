import { SxProps, Theme } from '@mui/material';

interface ProfilePageStyle {
  container: SxProps<Theme>;
  profileContainer: SxProps<Theme>;
}

export const styles: ProfilePageStyle = {
  container: {},
  profileContainer: {
    display: 'flex',
    gap: '16px',
  },
};
