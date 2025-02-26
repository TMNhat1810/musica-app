import { SxProps, Theme } from '@mui/material';

interface CommentSectionStyle {
  container: SxProps<Theme>;
  commentPannel: SxProps<Theme>;
}

export const styles: CommentSectionStyle = {
  container: {},
  commentPannel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1,
  },
};
