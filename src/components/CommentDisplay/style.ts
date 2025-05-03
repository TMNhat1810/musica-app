import { SxProps, Theme } from '@mui/material';

interface CommentDisplayStyle {
  container: SxProps<Theme>;
  contentContainer: SxProps<Theme>;
}

export const styles: CommentDisplayStyle = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1,
  },
};
