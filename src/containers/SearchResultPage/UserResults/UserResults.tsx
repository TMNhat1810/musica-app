import { Avatar, Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { User } from '../../../common/interfaces';
import { UserServices } from '../../../services';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FollowButton from '../../../components/FollowButton';
import { useAuth } from '../../../hooks';

interface UserResultsPropsType {
  query: string;
}

export default function UserResults({ query }: UserResultsPropsType) {
  const [users, setUsers] = useState<User[]>([]);

  const { t } = useTranslation();

  const { user } = useAuth();

  useEffect(() => {
    UserServices.searchUsers(query, 10)
      .then((res) => setUsers(res.users))
      .catch();
  }, [query]);

  return (
    <Box sx={styles.container}>
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {users.map((_user) => (
          <Box key={_user.id} sx={{ display: 'flex', gap: 1 }}>
            <Link to={`/p/${_user.id}`}>
              <Box>
                <Avatar src={_user.photo_url} sx={{ width: 64, height: 64 }} />
              </Box>
            </Link>
            <Box>
              <Link to={`/p/${_user.id}`} style={{ color: 'inherit' }}>
                <Typography variant="h5" fontWeight="bold">
                  {_user.display_name}
                </Typography>
              </Link>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography>@{_user.username}</Typography>
                <Typography>•</Typography>
                <Typography variant="caption">
                  {_user._count?.followers} {t('followers')}
                </Typography>
              </Box>
              <Box>
                {(!user || user.id !== _user.id) && (
                  <FollowButton target_id={_user.id} />
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
}
