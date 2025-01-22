import { SxProps, Theme } from '@mui/material';

interface FinishFormStyle {
  container: SxProps<Theme>;
  buttonContainer: SxProps<Theme>;
  previewContainer: SxProps<Theme>;
}

export const styles: FinishFormStyle = {
  container: {
    '& .mui-dropzone-container': {
      borderColor: 'gray',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '320px',
      height: '280px',
    },
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    paddingTop: '16px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  previewContainer: {
    display: 'flex',
    gap: '16px',
  },
};
