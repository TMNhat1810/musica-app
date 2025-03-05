import { SxProps, Theme } from '@mui/material';

interface HeaderStyle {
  container: SxProps<Theme>;
  leftSideContainer: SxProps<Theme>;
}

export const styles: HeaderStyle = {
  container: {
    position: 'sticky',
    display: 'flex',
    width: '100vw',
    justifyContent: 'space-between',
    padding: '0px 16px',
    paddingRight: '20px',
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: 'background.default',
  },
  leftSideContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
};
