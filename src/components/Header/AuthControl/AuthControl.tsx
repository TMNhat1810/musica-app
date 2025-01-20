import { Avatar, Box, Button } from '@mui/material';
import { styles } from './style';
import { useAuth } from '../../../hooks';
import { Link } from 'react-router-dom';

export default function AuthControl() {
  const { user } = useAuth();

  return (
    <Box sx={styles.container}>
      {user ? (
        <Avatar />
      ) : (
        <Link to="/auth/sign-in">
          <Button>Sign in</Button>
        </Link>
      )}
    </Box>
  );
}
