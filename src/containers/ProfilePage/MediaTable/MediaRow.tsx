import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  TableCell,
  TableRow,
} from '@mui/material';
import { Media } from '../../../common/interfaces';
import { DEFAULT_THUMBNAIL_URL } from '../../../constants';
import { formatDuration } from '../../../utils/datetime';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styles } from './style';
import { MediaServices } from '../../../services';
import { useState } from 'react';

interface MediaRowPropsType {
  media: Media;
}

export default function MediaRow({ media }: MediaRowPropsType) {
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    MediaServices.deleteMedia(media.id)
      .then(() => {
        setOpen(false);
        window.location.reload();
      })
      .catch();
  };

  return (
    <TableRow sx={styles.row}>
      <TableCell>
        <img
          src={media.thumbnail_url || DEFAULT_THUMBNAIL_URL}
          style={{
            width: '96px',
            height: '64px',
          }}
        />
      </TableCell>
      <TableCell>{media.title}</TableCell>
      <TableCell>{formatDuration(media.duration)}</TableCell>
      <TableCell></TableCell>
      <TableCell>
        <IconButton sx={{ backgroundColor: 'primary.main' }}>
          <EditIcon />
        </IconButton>
        <IconButton sx={{ backgroundColor: 'red' }} onClick={() => setOpen(true)}>
          <DeleteIcon />
        </IconButton>
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
