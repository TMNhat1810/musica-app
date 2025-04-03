import { SxProps, Theme } from '@mui/material';

interface CommentDisplayStyle {
  container: SxProps<Theme>;
}

export const styles: CommentDisplayStyle = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
  },
};
