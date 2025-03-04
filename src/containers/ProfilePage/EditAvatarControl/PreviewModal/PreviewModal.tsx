import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { UserServices } from '../../../../services';
import { useState } from 'react';

interface PreviewModalPropsType {
  data: File;
  onClose: () => void;
}

export default function PreviewModal({ data, onClose }: PreviewModalPropsType) {
  const open = Boolean(data);

  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = () => {
    setLoading(true);
    UserServices.updateCurrentUserAvatar(data)
      .then(() => {
        onClose();
        window.location.reload();
      })
      .catch()
      .finally(() => setLoading(false));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm avatar changing:</DialogTitle>
      <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
        {data && (
          <Avatar src={URL.createObjectURL(data)} sx={{ width: 150, height: 150 }} />
        )}
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        {!loading && (
          <Button onClick={handleUpload} color="primary">
            Confirm
          </Button>
        )}
        {loading && <CircularProgress />}
      </DialogActions>
    </Dialog>
  );
}
