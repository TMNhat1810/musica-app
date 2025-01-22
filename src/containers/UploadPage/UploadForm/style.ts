import { SxProps, Theme } from '@mui/material';

interface UploadFormStyle {
  container: SxProps<Theme>;
}

export const styles: UploadFormStyle = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'background.paper',
    width: '80%',
    height: '90%',
    padding: '20px',
    borderRadius: '20px',
    '@media (max-width:800px)': {
      width: '100%',
    },
  },
};
