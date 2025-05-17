import { SxProps, Theme } from '@mui/material';

interface CommentInputStyle {
  container: SxProps<Theme>;
  inputContainer: SxProps<Theme>;
}

export const styles: CommentInputStyle = {
  container: {
    width: '100%',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
  },
};
