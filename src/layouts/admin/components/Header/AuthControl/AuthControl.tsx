import { Box, Button } from '@mui/material';
import { styles } from './style';
import { useAuth } from '../../../../../hooks';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';

export default function AuthControl() {
  const { user } = useAuth();

  return (
    <Box sx={styles.container}>
      {user ? (
        <Box sx={styles.authContainer}>
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
