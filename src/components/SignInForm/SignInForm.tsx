import { Box, Button, TextField, Typography } from '@mui/material';
import { styles } from './style';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks';

export default function SignInForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { signinUser } = useAuth();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      signinUser(username, password);
    } catch {
      setError('Username or password mismatched!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={styles.container}
      onKeyDown={(event) => {
        if (event.key === 'Enter') handleSignIn();
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: 'center' }}
        borderBottom="2px solid white"
        marginBottom="5px"
      >
        MUSICA
      </Typography>
      <TextField
        label="username"
        variant="outlined"
        onChange={(event) => {
          setUsername(event.target.value);
          setError('');
        }}
      />
      <TextField
        label="password"
        variant="outlined"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
          setError('');
        }}
      />
      <Typography sx={{ fontSize: '13px', textAlign: 'center' }} color="error">
        {error}
      </Typography>
      <Box sx={styles.buttonContainer}>
        <Button
          variant="contained"
          sx={styles.button}
          onClick={handleSignIn}
          disabled={loading}
        >
          Sign In
        </Button>
      </Box>
      <Typography sx={styles.bottomText}>
        Don't have account? <Link to="/auth/sign-up">Sign up</Link>{' '}
      </Typography>
    </Box>
  );
}
