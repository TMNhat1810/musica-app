import {
  Avatar,
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { User } from '../../../../common/interfaces';
import { Link } from 'react-router-dom';

interface UserRowPropsType {
  user: User;
}

export default function UserRow({ user }: UserRowPropsType) {
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
      <TableCell>
        <IconButton></IconButton>
      </TableCell>
    </TableRow>
  );
}
