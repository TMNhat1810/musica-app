import { SxProps, Theme } from '@mui/material';

interface MainLayoutStyle {
  container: SxProps<Theme>;
  contentContainer: SxProps<Theme>;
}

export const styles: MainLayoutStyle = {
  container: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarGutter: 'stable',
    '&::-webkit-scrollbar': {
      width: '8px',
      zIndex: 1000,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'background.default',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'gray',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'background.paper',
    },
  },
  contentContainer: {
    flex: 1,
  },
};
