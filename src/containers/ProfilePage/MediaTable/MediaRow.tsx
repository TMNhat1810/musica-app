import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';
import { Media } from '../../../common/interfaces';
import { DEFAULT_THUMBNAIL_URL } from '../../../constants';
import { formatDuration } from '../../../utils/datetime';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styles } from './style';
import { MediaServices } from '../../../services';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MediaRowPropsType {
  media: Media;
}

export default function MediaRow({ media }: MediaRowPropsType) {
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();

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
        <Button sx={{ p: 1 }} onClick={() => navigate(`/w/${media.id}`)}>
          <img
            src={media.thumbnail_url || DEFAULT_THUMBNAIL_URL}
            style={{
              width: '72px',
              height: '48px',
            }}
          />
        </Button>
      </TableCell>
      <TableCell>{media.title}</TableCell>
      <TableCell>{formatDuration(media.duration)}</TableCell>
      <TableCell></TableCell>
      <TableCell align="right">
        <Tooltip title="Edit">
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
