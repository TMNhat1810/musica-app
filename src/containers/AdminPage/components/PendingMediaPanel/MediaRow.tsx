import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Modal,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';
import { DEFAULT_THUMBNAIL_URL } from '../../../../constants';
import { formatDuration } from '../../../../utils/datetime';
import DeleteIcon from '@mui/icons-material/Delete';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useState } from 'react';
import { Media } from '../../../../common/interfaces';
import { AdminServices, MediaServices } from '../../../../services';
import VideoPlayer from '../../../../components/MediaControl/VideoControl/VideoPlayer';
import { useTranslation } from 'react-i18next';

interface MediaRowPropsType {
  media: Media;
  approveCallback?: () => void;
  deleteCallback?: () => void;
}

export default function MediaRow({ media, approveCallback }: MediaRowPropsType) {
  const [mediaPreviewModalOpen, setMediaPreviewModalOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState<boolean>(false);

  const { t } = useTranslation();

  const handleDelete = () => {
    MediaServices.deleteMedia(media.id)
      .then(() => {
        window.location.reload();
      })
      .catch();
  };

  const handleAprrove = () => {
    AdminServices.approveMedia(media.id)
      .then(() => {
        if (approveCallback) approveCallback();
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
        <Button sx={{ p: 1 }} onClick={() => setMediaPreviewModalOpen(true)}>
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
        <Tooltip title={t('approve')}>
          <IconButton
            sx={{
              backgroundColor: 'primary.main',
              borderRadius: 2,
              px: 1,
              py: 0.5,
              ml: 1,
            }}
            onClick={() => setApproveDialogOpen(true)}
          >
            <FactCheckIcon />
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
      <Modal
        open={mediaPreviewModalOpen}
        onClose={() => setMediaPreviewModalOpen(false)}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            width: 400,
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {mediaPreviewModalOpen && (
            <VideoPlayer
              src={media.media_url}
              poster={media.thumbnail_url || DEFAULT_THUMBNAIL_URL}
            />
          )}
        </Box>
      </Modal>
      <Dialog open={approveDialogOpen} onClose={() => setApproveDialogOpen(false)}>
        <DialogTitle>{t('txt-approve-media-message')}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setApproveDialogOpen(false)}>{t('cancel')}</Button>
          <Button onClick={handleAprrove} color="success">
            {t('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>{t('txt-delete-confirm-message')}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>{t('cancel')}</Button>
          <Button onClick={handleDelete} color="error">
            {t('delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
}
