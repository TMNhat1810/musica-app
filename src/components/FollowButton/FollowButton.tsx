import { IconButton, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react';
import { UserServices } from '../../services';
import { useAuth } from '../../hooks';
import { styles } from './style';

interface FollowButtonPropsType {
  target_id: string;
}

export default function FollowButton({ target_id }: FollowButtonPropsType) {
  const [userFollowed, setUserFollowed] = useState<boolean>(false);
  const [followLoading, setFollowLoading] = useState<boolean>(false);

  const { user } = useAuth();

  const followUser = () => {
    if (!user) return;
    setFollowLoading(true);
    UserServices.followUser(target_id)
      .then(() => setUserFollowed(true))
      .catch()
      .finally(() => setFollowLoading(false));
  };

  const unfollowUser = () => {
    if (!user) return;
    setFollowLoading(true);
    UserServices.unfollowUser(target_id)
      .then(() => setUserFollowed(false))
      .catch()
      .finally(() => setFollowLoading(false));
  };

  useEffect(() => {
    if (!user) return;
    setFollowLoading(true);
    UserServices.checkUserFollow(target_id)
      .then((res) => setUserFollowed(res.data))
      .catch()
      .finally(() => setFollowLoading(false));
  }, [target_id, user]);

  return (
    <IconButton
      sx={{
        ...styles.container,
        bgcolor: userFollowed ? 'primary.dark' : 'background.paper',
      }}
      onClick={userFollowed ? unfollowUser : followUser}
      disabled={followLoading}
    >
      {userFollowed ? <VisibilityOffIcon /> : <VisibilityIcon />}
      <Typography>{userFollowed ? 'Followed' : 'Follow'}</Typography>
    </IconButton>
  );
}
