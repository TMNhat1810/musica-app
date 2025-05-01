import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { ForumPost } from '../../../common/interfaces';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ForumServices } from '../../../services';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ForumPostTableRowPropsType {
  post: ForumPost;
}

export default function ForumPostTableRow({ post }: ForumPostTableRowPropsType) {
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    ForumServices.deletePost(post.id)
      .then(() => {
        setOpen(false);
        window.location.reload();
      })
      .catch();
  };

  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }}
    >
      <TableCell></TableCell>
      <TableCell sx={{ maxWidth: '200px' }}>
        <Link to={`/forum/post/${post.id}`}>
          <Typography
            sx={{
              whiteSpace: 'nowrap',
              WebkitLineClamp: 1,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {post.title}
          </Typography>
        </Link>
      </TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell align="right">
        <Tooltip title="Edit">
          <Link to={`/forum/post/${post.id}/edit`}>
            <IconButton
              sx={{
                backgroundColor: 'primary.main',
                borderRadius: 2,
                px: 1.25,
                py: 0.5,
              }}
            >
              <EditIcon />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            sx={{
              backgroundColor: 'red',
              borderRadius: 2,
              px: 1.25,
              py: 0.5,
              ml: 1,
            }}
            onClick={() => setOpen(true)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
}
