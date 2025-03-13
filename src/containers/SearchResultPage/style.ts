import { SxProps, Theme } from '@mui/material';

interface SearchResultPageStyle {
  container: SxProps<Theme>;
  mediaPannel: SxProps<Theme>;
}

export const styles: SearchResultPageStyle = {
  container: {
    display: 'flex',
    flex: 1,
  },
  mediaPannel: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
};
