import { SxProps, Theme } from '@mui/material';

interface UploadPageStyle {
  container: SxProps<Theme>;
}

export const styles: UploadPageStyle = {
  container: {
    flex: 1,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '20px',
  },
};
