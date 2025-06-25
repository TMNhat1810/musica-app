import { SxProps, Theme } from '@mui/material';

interface SearchResultPageStyle {
  container: SxProps<Theme>;
  mediaPannel: SxProps<Theme>;
  chipContainer: SxProps<Theme>;
  chip: SxProps<Theme>;
  selectedChip: SxProps<Theme>;
}

export const styles: SearchResultPageStyle = {
  container: {
    flex: 1,
    px: 2,
  },
  mediaPannel: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 1,
    pt: 1,
    justifyContent: 'space-around',
  },
  chipContainer: {
    pl: 2,
    pt: 1,
    display: 'flex',
    gap: 1,
  },
  chip: {
    border: '2px solid',
    borderColor: 'text.primary',
  },
  selectedChip: {},
};
