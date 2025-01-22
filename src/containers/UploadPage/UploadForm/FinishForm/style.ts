import { SxProps, Theme } from '@mui/material';

interface FinishFormStyle {
  container: SxProps<Theme>;
  buttonContainer: SxProps<Theme>;
}

export const styles: FinishFormStyle = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};
