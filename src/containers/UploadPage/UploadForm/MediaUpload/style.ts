import { SxProps, Theme } from '@mui/material';

interface MediaUploadStyle {
  container: SxProps<Theme>;
}

export const styles: MediaUploadStyle = {
  container: {
    paddingTop: '16px',
    '& .mui-dropzone-container': {
      borderColor: 'gray',
    },
  },
};
