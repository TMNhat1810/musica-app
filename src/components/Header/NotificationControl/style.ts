import { SxProps, Theme } from '@mui/material';

interface NotificationControlStyle {
  container: SxProps<Theme>;
  popupContainer: SxProps<Theme>;
  iconButton: SxProps<Theme>;
  selectedIconButton: SxProps<Theme>;
}

export const styles: NotificationControlStyle = {
  container: {},
  popupContainer: { p: 1 },
  iconButton: {
    borderWidth: 2,
    borderColor: 'text.primary',
    borderStyle: 'solid',
    borderRadius: 5,
    px: 2,
    py: 0.5,
    display: 'flex',
    flexDirection: 'column',
  },
  selectedIconButton: {
    borderColor: 'primary.main',
  },
};
