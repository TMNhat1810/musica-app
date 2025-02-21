import { SxProps, Theme } from '@mui/material';

interface ReplyDisplayStyle {
  container: SxProps<Theme>;
}

export const styles: ReplyDisplayStyle = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
  },
};
