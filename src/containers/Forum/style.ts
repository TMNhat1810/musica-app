import { SxProps, Theme } from '@mui/material';

interface ForumStyle {
  container: SxProps<Theme>;
  titleText: SxProps<Theme>;
  contentText: SxProps<Theme>;
}

export const styles: ForumStyle = {
  container: {},
  titleText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  contentText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    whiteSpace: 'pre-line',
    mt: 1,
  },
};
