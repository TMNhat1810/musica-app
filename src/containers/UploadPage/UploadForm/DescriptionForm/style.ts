import { SxProps, Theme } from '@mui/material';

interface DescriptionFormStyle {
  container: SxProps<Theme>;
  buttonContainer: SxProps<Theme>;
  formContainer: SxProps<Theme>;
}

export const styles: DescriptionFormStyle = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    paddingTop: '24px',
    height: '100%',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
};
