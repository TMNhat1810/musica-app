import React from 'react';
import { Chip, SxProps, Theme } from '@mui/material';

export type StatusType = 'active' | 'pending' | 'inactive';

interface Props {
  status: StatusType;
}

const getColorStyles = (status: StatusType): SxProps<Theme> => {
  switch (status) {
    case 'active':
      return {
        color: 'black',
        backgroundColor: 'primary.main',
      };
    case 'pending':
      return {
        color: 'black',
        backgroundColor: 'warning.light',
      };
    case 'inactive':
      return {
        color: 'black',
        backgroundColor: 'error.main',
      };
    default:
      return {};
  }
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const StatusChip: React.FC<Props> = ({ status }) => {
  return (
    <Chip
      label={capitalize(status)}
      size="small"
      sx={{
        fontWeight: 'bold',
        ...getColorStyles(status),
      }}
    />
  );
};

export default StatusChip;
