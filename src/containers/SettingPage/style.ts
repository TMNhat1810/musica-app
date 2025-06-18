import { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    flex: 1,
    px: 2,
    pt: 2,
  },
  settingContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '2px solid',
    pt: 2,
    px: 2,
  },
  setting: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};
