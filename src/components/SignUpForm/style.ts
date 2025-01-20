import { SxProps, Theme } from '@mui/material';

interface SignInFormStyle {
  container: SxProps<Theme>;
  input: SxProps<Theme>;
  buttonContainer: SxProps<Theme>;
  button: SxProps<Theme>;
  bottomText: SxProps<Theme>;
}

export const styles: SignInFormStyle = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '300px',
    gap: '15px',
    padding: '10px',
    justifyContent: 'center',
    height: '100%',
  },
  input: { color: 'white' },
  buttonContainer: {
    padding: '0px 10px',
  },
  button: {
    width: '100%',
    textTransform: 'none',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  bottomText: {
    fontSize: '13px',
    textAlign: 'center',
  },
};
