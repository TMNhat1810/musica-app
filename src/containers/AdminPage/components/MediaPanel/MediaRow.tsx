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
import { useTranslation } from 'react-i18next';
import { MediaServices } from '../../../../services';

interface MediaRowPropsType {
  media: Media;
}

export default function MediaRow({ media }: MediaRowPropsType) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [statsDialogOpen, setStatsDialogOpen] = useState<boolean>(false);

  const handleDelete = () => {
    MediaServices.deleteMedia(media.id)
      .then(() => {
        window.location.reload();
      })
      .catch();
  };

  const navigate = useNavigate();
  const { t } = useTranslation();

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
        <Tooltip title={t('statistics')}>
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
        <Tooltip title={t('delete')}>
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
        <DialogTitle>{t('txt-delete-confirm-message')}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>{t('cancel')}</Button>
          <Button onClick={handleDelete} color="error">
            {t('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={statsDialogOpen} onClose={() => setStatsDialogOpen(false)}>
        {statsDialogOpen && <MediaStatsContainer id={media.id} />}
      </Dialog>
    </TableRow>
  );
}
