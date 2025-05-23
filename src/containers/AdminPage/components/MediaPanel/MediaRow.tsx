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
import { useNavigate } from 'react-router-dom';
import { DEFAULT_THUMBNAIL_URL } from '../../../../constants';
import { formatDuration } from '../../../../utils/datetime';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { Media } from '../../../../common/interfaces';
import MediaStatsContainer from './MediaStatsContainer';

interface MediaRowPropsType {
  media: Media;
}

export default function MediaRow({ media }: MediaRowPropsType) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [statsDialogOpen, setStatsDialogOpen] = useState<boolean>(false);

  const handleDelete = () => {};

  const navigate = useNavigate();

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
