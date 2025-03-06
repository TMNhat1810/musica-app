import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { styles } from './style';
import { useState } from 'react';
import { UserServices } from '../../../../services';

interface ChangeDisplayNameModalPropsType {
  open: boolean;
  onClose: () => void;
}

export default function ChangeDisplayNameModal({
  open,
  onClose,
}: ChangeDisplayNameModalPropsType) {
  const [newDisplayName, setNewDisplayName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeDisplayName = () => {
    if (!newDisplayName) {
      setError('Display name is empty!');
      return;
    }
    setLoading(true);
    UserServices.updateCurrentUserProfile({ display_name: newDisplayName })
      .then(onClose)
      .then(() => {
        window.location.reload();
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.contentContainer}>
        <Typography variant="h6" gutterBottom>
          Change Display Name
        </Typography>
        <TextField
          fullWidth
          label="New Display Name"
          variant="outlined"
          margin="normal"
          value={newDisplayName}
          onChange={(e) => setNewDisplayName(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Box sx={styles.buttonContainer}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleChangeDisplayName}
            >
              Change
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
