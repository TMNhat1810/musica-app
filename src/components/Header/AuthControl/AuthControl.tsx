import { Box, Button } from '@mui/material';
import { styles } from './style';
import { useAuth } from '../../../hooks';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';

export default function AuthControl() {
  const { user } = useAuth();

  return (
    <Box sx={styles.container}>
      {user ? (
        <UserAvatar user={user} />
      ) : (
        <Link to="/auth/sign-in">
          <Button>Sign in</Button>
        </Link>
      )}
    </Box>
  );
}
