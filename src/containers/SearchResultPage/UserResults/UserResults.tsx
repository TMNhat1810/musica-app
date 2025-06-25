import { Avatar, Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { User } from '../../../common/interfaces';
import { UserServices } from '../../../services';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FollowButton from '../../../components/FollowButton';

interface UserResultsPropsType {
  query: string;
}

export default function UserResults({ query }: UserResultsPropsType) {
  const [users, setUsers] = useState<User[]>([]);

  const { t } = useTranslation();

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
        {users.map((user) => (
          <Box key={user.id} sx={{ display: 'flex', gap: 1 }}>
            <Link to={`/p/${user.id}`}>
              <Box>
                <Avatar src={user.photo_url} sx={{ width: 64, height: 64 }} />
              </Box>
            </Link>
            <Box>
              <Link to={`/p/${user.id}`} style={{ color: 'inherit' }}>
                <Typography variant="h5" fontWeight="bold">
                  {user.display_name}
                </Typography>
              </Link>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography>@{user.username}</Typography>
                <Typography>•</Typography>
                <Typography variant="caption">
                  {user._count?.followers} {t('follower')}
                </Typography>
              </Box>
            </Box>
            <Box>
              <FollowButton target_id={user.id} />
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
}
