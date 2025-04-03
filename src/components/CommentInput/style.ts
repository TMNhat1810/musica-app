import { SxProps, Theme } from '@mui/material';

interface CommentInputStyle {
  container: SxProps<Theme>;
  inputContainer: SxProps<Theme>;
}

export const styles: CommentInputStyle = {
  container: {},
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
  },
};
