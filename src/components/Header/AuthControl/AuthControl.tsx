import { Box, Button, IconButton, Typography } from '@mui/material';
import { styles } from './style';
import { useAuth } from '../../../hooks';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import AddIcon from '@mui/icons-material/Add';
import NotificationControl from '../NotificationControl';
import { useTranslation } from 'react-i18next';

interface AuthControlPropsType {
  forumMode?: boolean;
}

export default function AuthControl({ forumMode = false }: AuthControlPropsType) {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <Box sx={styles.container}>
      {user ? (
        <Box sx={styles.authContainer}>
          <Link to={forumMode ? '/forum/new' : '/upload'}>
            <IconButton
              sx={{
                py: 0.5,
                pl: 1,
                pr: 1.5,
                borderRadius: 5,
                backgroundColor: 'background.paper',
              }}
            >
              <AddIcon
                sx={{
                  color: 'white',
                  width: '28px',
                  height: '28px',
                  mr: 0.5,
                }}
              />
              <Typography>{t('create')}</Typography>
            </IconButton>
          </Link>
          <NotificationControl />
          <UserAvatar user={user} />
        </Box>
      ) : (
        <Box sx={styles.buttonContainer}>
          <Link to="/auth/sign-up">
            <Button sx={{ textTransform: 'none', fontWeight: 'bold', py: 0.5 }}>
              {t('signup')}
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
              {t('signin')}
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
}
