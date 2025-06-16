import {
  Avatar,
  Box,
  Dialog,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { User } from '../../../../common/interfaces';
import { Link } from 'react-router-dom';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import { useState } from 'react';
import UserStatsContainer from './UserStatsContainer';

interface UserRowPropsType {
  user: User;
}

export default function UserRow({ user }: UserRowPropsType) {
  const [statsDialogOpen, setStatsDialogOpen] = useState<boolean>(false);

  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }}
    >
      <TableCell>
        <Link to={`/p/${user.id}`}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar src={user.photo_url} />
            <Typography>{user.username}</Typography>
          </Box>
        </Link>
      </TableCell>
      <TableCell>{user.display_name}</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell align="right">
        <Tooltip title="View statistics">
          <IconButton
            sx={{
              backgroundColor: 'primary.main',
              borderRadius: 2,
              px: 1,
              py: 0.5,
            }}
            onClick={() => setStatsDialogOpen(true)}
          >
            <AnalyticsOutlinedIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
      <Dialog open={statsDialogOpen} onClose={() => setStatsDialogOpen(false)}>
        {statsDialogOpen && <UserStatsContainer id={user.id} />}
      </Dialog>
    </TableRow>
  );
}
