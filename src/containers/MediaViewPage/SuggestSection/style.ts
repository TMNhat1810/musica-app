import { SxProps, Theme } from '@mui/material';

interface SuggestSectionStyle {
  container: SxProps<Theme>;
}

export const styles: SuggestSectionStyle = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: 2,
  },
};
