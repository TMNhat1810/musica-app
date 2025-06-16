import { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    '&:active, &:focus': {
      outline: 'none',
      border: 'none',
    },
    gap: 1,
    borderRadius: 5,
    px: 2,
  },
};
