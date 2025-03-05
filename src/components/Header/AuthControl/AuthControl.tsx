import { Box, Button, IconButton } from '@mui/material';
import { styles } from './style';
import { useAuth } from '../../../hooks';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function AuthControl() {
  const { user } = useAuth();

  return (
    <Box sx={styles.container}>
      {user ? (
        <Box sx={styles.signInContainer}>
          <Link to="/upload">
            <IconButton
              sx={{
                border: '2px solid white',
                padding: '5px',
              }}
            >
              <FileUploadIcon
                sx={{
                  color: 'white',
                  width: '28px',
                  height: '28px',
                }}
              />
            </IconButton>
          </Link>
          <UserAvatar user={user} />
        </Box>
      ) : (
        <Link to="/auth/sign-in">
          <Button>Sign in</Button>
        </Link>
      )}
    </Box>
  );
}
