import { SxProps, Theme } from '@mui/material';

interface PostEditPageStyle {
  container: SxProps<Theme>;
  formContainer: SxProps<Theme>;
  chipContainer: SxProps<Theme>;
}

export const styles: PostEditPageStyle = {
  container: { width: '80%', justifySelf: 'center' },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  chipContainer: { display: 'flex', gap: 1 },
};
