import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { styles } from './style';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UserServices } from '../../../../services';

interface ChangePasswordModalPropsType {
  open: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  open,
  onClose,
}: ChangePasswordModalPropsType) {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setError('Confirm password not matched!');
      return;
    }
    setLoading(true);
    UserServices.updateCurrentUserPassword(currentPassword, newPassword)
      .then(onClose)
      .catch(() => {
        setError('Current password is incorrect!');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setError('');
  }, [currentPassword, newPassword, confirmPassword]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.contentContainer}>
        <Typography variant="h6" gutterBottom>
          Change Password
        </Typography>
        <TextField
          fullWidth
          type={showCurrentPassword ? 'text' : 'password'}
          label="Current Password"
          variant="outlined"
          margin="normal"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    edge="end"
                  >
                    {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          label="New Password"
          variant="outlined"
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          fullWidth
          type={showConfirmPassword ? 'text' : 'password'}
          label="Confirm New Password"
          variant="outlined"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
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
              onClick={handlePasswordChange}
            >
              Change
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
