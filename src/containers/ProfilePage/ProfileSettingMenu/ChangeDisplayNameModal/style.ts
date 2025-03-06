import { SxProps, Theme } from '@mui/material';

interface ChangeDisplayNameModalStyle {
  container: SxProps<Theme>;
  contentContainer: SxProps<Theme>;
  buttonContainer: SxProps<Theme>;
}

export const styles: ChangeDisplayNameModalStyle = {
  container: {},
  contentContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  },
  buttonContainer: {
    mt: 2,
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '40px',
    alignItems: 'center',
  },
};
