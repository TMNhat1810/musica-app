import { Box, Button, TextField, Typography } from '@mui/material';
import { styles } from './style';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks';
import { useTranslation } from 'react-i18next';

export default function SignInForm() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { signinUser } = useAuth();
  const { t } = useTranslation();

  const handleSignIn = async () => {
    if (!username) {
      setError('empty-username-error');
      return;
    }
    if (!password) {
      setError('empty-password-error');
      return;
    }
    setLoading(true);
    signinUser(username, password)
      .catch(() => setError('wrong-username-password-error'))
      .finally(() => setLoading(false));
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
        label={t('username')}
        variant="outlined"
        onChange={(event) => {
          setUsername(event.target.value);
          setError('');
        }}
      />
      <TextField
        label={t('password')}
        variant="outlined"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
          setError('');
        }}
      />
      <Typography sx={{ fontSize: '13px' }} color="error">
        {t(error)}
      </Typography>
      <Box sx={styles.buttonContainer}>
        <Button
          variant="contained"
          sx={styles.button}
          onClick={handleSignIn}
          disabled={loading}
        >
          {t('signin')}
        </Button>
      </Box>
      <Typography sx={styles.bottomText}>
        {t('no-account-message')} <Link to="/auth/sign-up">{t('signup')}</Link>
      </Typography>
    </Box>
  );
}
