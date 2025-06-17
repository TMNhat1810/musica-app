import { Box, Button, TextField, Typography } from '@mui/material';
import { styles } from './style';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { UserServices } from '../../services';
import { useAuth } from '../../hooks';
import { setAuthHeader } from '../../utils/axios';
import { TokenUtils } from '../../utils/token';
import { useTranslation } from 'react-i18next';

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function SignUpForm() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { getUserProfile } = useAuth();
  const { t } = useTranslation();

  const handleSignUp = async () => {
    if (!username) {
      setError('empty-username-error');
      return;
    }
    if (!password) {
      setError('empty-password-error');
      return;
    }
    if (!email) {
      setError('empty-email-error');
      return;
    }
    if (!isValidEmail(email)) {
      setError('invalid-email-error');
      return;
    }
    if (!confirmPassword) {
      setError('empty-confirm-password-error');
      return;
    }
    if (password !== confirmPassword) {
      setError('confirm-password-notmatched-error');
      return;
    }
    try {
      setLoading(true);

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
      setError('user-or-email-existed-error');
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
        label={t('username')}
        variant="outlined"
        onChange={(event) => {
          setError('');
          setUsername(event.target.value);
        }}
      />
      <TextField
        label="Email"
        variant="outlined"
        onChange={(event) => {
          setError('');
          setEmail(event.target.value);
        }}
      />
      <TextField
        label={t('password')}
        variant="outlined"
        type="password"
        onChange={(event) => {
          setError('');
          setPassword(event.target.value);
        }}
      />
      <TextField
        label={t('confirmed-password')}
        variant="outlined"
        type="password"
        onChange={(event) => {
          setError('');
          setConfirmPassword(event.target.value);
        }}
      />
      <Typography sx={{ fontSize: '13px' }} color="error">
        {t(error)}
      </Typography>
      <Box sx={styles.buttonContainer}>
        <Button
          variant="contained"
          sx={styles.button}
          onClick={handleSignUp}
          disabled={loading}
        >
          {t('signup')}
        </Button>
      </Box>
      <Typography sx={styles.bottomText}>
        {t('had-account-message')} <Link to="/auth/sign-in">{t('signin')}</Link>
      </Typography>
    </Box>
  );
}
