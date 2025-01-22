import { SxProps, Theme } from '@mui/material';

interface MediaUploadStyle {
  container: SxProps<Theme>;
  buttonContainer: SxProps<Theme>;
}

export const styles: MediaUploadStyle = {
  container: {
    paddingTop: '16px',
    '& .mui-dropzone-container': {
      borderColor: 'gray',
    },
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
