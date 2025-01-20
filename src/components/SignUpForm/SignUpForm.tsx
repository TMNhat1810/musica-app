import { Box, Button, TextField, Typography } from '@mui/material';
import { styles } from './style';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { UserServices } from '../../services';
import { useAuth } from '../../hooks';
import { setAuthHeader } from '../../utils/axios';
import { TokenUtils } from '../../utils/token';

export default function SignUpForm() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { getUserProfile } = useAuth();

  const handleSignUp = async () => {
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        setError('Confirm password not matched!');
        return;
      }
      const tokens = await UserServices.register(
        username,
        username,
        email,
        password,
      );
      const { access_token, refresh_token } = tokens;
      setAuthHeader(access_token);
      TokenUtils.setAccessToken(access_token);
      TokenUtils.setRefreshToken(refresh_token);
      getUserProfile();
    } catch {
      setError('Invalid username or email!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={styles.container}
      onKeyDown={(event) => {
        if (event.key === 'Enter') handleSignUp();
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
        slotProps={{ inputLabel: { sx: { color: 'gray' } } }}
        sx={{
          color: 'white',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
          },
        }}
        onChange={(event) => {
          setError('');
          setUsername(event.target.value);
        }}
      />
      <TextField
        label="email"
        variant="outlined"
        slotProps={{ inputLabel: { sx: { color: 'gray' } } }}
        sx={{
          color: 'white',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
          },
        }}
        onChange={(event) => {
          setError('');
          setEmail(event.target.value);
        }}
      />
      <TextField
        label="password"
        variant="outlined"
        type="password"
        slotProps={{ inputLabel: { sx: { color: 'gray' } } }}
        sx={{
          color: 'white',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
          },
        }}
        onChange={(event) => {
          setError('');
          setPassword(event.target.value);
        }}
      />
      <TextField
        label="confirm password"
        variant="outlined"
        type="password"
        slotProps={{ inputLabel: { sx: { color: 'gray' } } }}
        sx={{
          color: 'white',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
          },
        }}
        onChange={(event) => {
          setError('');
          setConfirmPassword(event.target.value);
        }}
      />
      <Typography sx={{ fontSize: '13px', textAlign: 'center' }} color="error">
        {error}
      </Typography>
      <Box sx={styles.buttonContainer}>
        <Button
          variant="contained"
          sx={styles.button}
          onClick={handleSignUp}
          disabled={loading}
        >
          Sign Up
        </Button>
      </Box>
      <Typography sx={styles.bottomText}>
        Already had account? <Link to="/auth/sign-in">Sign in</Link>{' '}
      </Typography>
    </Box>
  );
}
