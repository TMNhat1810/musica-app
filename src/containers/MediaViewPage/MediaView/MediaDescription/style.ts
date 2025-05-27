import { SxProps, Theme } from '@mui/material';

interface MediaDescriptionStyle {
  container: SxProps<Theme>;
  titleContainer: SxProps<Theme>;
  ownerInfoContainer: SxProps<Theme>;
  descriptionContainer: SxProps<Theme>;
  actionContainer: SxProps<Theme>;
  iconbutton: SxProps<Theme>;
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
  actionContainer: {
    display: 'flex',
    gap: 1,
  },
  iconbutton: {
    '&:focus, &:active, &:hover': {
      outline: 'none',
      border: 'none',
    },
    px: 2,
    borderRadius: 5,
    display: 'flex',
    gap: 1,
    bgcolor: 'background.paper',
  },
};
