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
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import { MediaServices } from '../../../services';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MediaStatsContainer from './MediaStatsContainer';
import StatusChip from '../../../components/StatusChip';

interface MediaRowPropsType {
  media: Media;
}

export default function MediaRow({ media }: MediaRowPropsType) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [statsDialogOpen, setStatsDialogOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleDelete = async () => {
    MediaServices.deleteMedia(media.id)
      .then(() => {
        setDeleteDialogOpen(false);
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
      <TableCell>
        <StatusChip status={media.status} />
      </TableCell>
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
        <Tooltip title="Delete">
          <IconButton
            sx={{
              backgroundColor: 'red',
              borderRadius: 2,
              px: 1,
              py: 0.5,
              ml: 1,
            }}
            onClick={() => setDeleteDialogOpen(true)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={statsDialogOpen} onClose={() => setStatsDialogOpen(false)}>
        {statsDialogOpen && <MediaStatsContainer id={media.id} />}
      </Dialog>
    </TableRow>
  );
}
