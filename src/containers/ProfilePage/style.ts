import { SxProps, Theme } from '@mui/material';

interface ProfilePageStyle {
  container: SxProps<Theme>;
  headerContainer: SxProps<Theme>;
  profileContainer: SxProps<Theme>;
  tabLabel: SxProps<Theme>;
  tabContainer: SxProps<Theme>;
  tabContent: SxProps<Theme>;
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
  tabLabel: {
    '&:focus, &:active, &:hover': {
      outline: 'none',
      border: 'none',
    },
    color: 'text.primary',
  },
  tabContainer: {
    px: 4,
  },
  tabContent: {
    mt: 1,
  },
};
