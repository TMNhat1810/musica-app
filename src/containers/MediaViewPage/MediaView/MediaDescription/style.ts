import { SxProps, Theme } from '@mui/material';

interface MediaDescriptionStyle {
  container: SxProps<Theme>;
  titleContainer: SxProps<Theme>;
  ownerInfoContainer: SxProps<Theme>;
  descriptionContainer: SxProps<Theme>;
}

export const styles: MediaDescriptionStyle = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  titleContainer: {},
  ownerInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  descriptionContainer: {
    p: 2,
    backgroundColor: 'background.paper',
    borderRadius: 5,
  },
};
