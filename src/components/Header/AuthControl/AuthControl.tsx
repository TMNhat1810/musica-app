import { Avatar, Box, Button } from '@mui/material';
import { styles } from './style';
import { useAuth } from '../../../hooks';

export default function AuthControl() {
  const { user } = useAuth();

  return (
    <Box sx={styles.container}>{user ? <Avatar /> : <Button>Sign in</Button>}</Box>
  );
}
