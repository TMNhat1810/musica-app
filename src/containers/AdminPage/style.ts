import { SxProps, Theme } from '@mui/material';

interface AdminPageStyle {
  container: SxProps<Theme>;
  tabLabel: SxProps<Theme>;
  dataContainer: SxProps<Theme>;
}

export const styles: AdminPageStyle = {
  container: {
    flex: 1,
    display: 'flex',
    gap: 2,
    pt: 2,
  },
  tabLabel: {
    '&:focus, &:active, &:hover': {
      outline: 'none',
      border: 'none',
    },
    color: 'text.primary',
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dataContainer: {
    flex: 1,
  },
};
