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
        <Box sx={styles.authContainer}>
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
        <Box sx={styles.buttonContainer}>
          <Link to="/auth/sign-up">
            <Button sx={{ textTransform: 'none', fontWeight: 'bold', py: 0.5 }}>
              Sign up
            </Button>
          </Link>
          <Link to="/auth/sign-in">
            <Button
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                backgroundColor: 'primary.main',
                py: 0.5,
                px: 1.5,
                color: 'black',
                borderRadius: 5,
              }}
            >
              Log in
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
}
