import { SxProps, Theme } from '@mui/material';

interface CommentDisplayStyle {
  container: SxProps<Theme>;
}

export const styles: CommentDisplayStyle = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
  },
};
