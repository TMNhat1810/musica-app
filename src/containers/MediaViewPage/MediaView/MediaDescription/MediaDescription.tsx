import { Avatar, Box, IconButton, Snackbar, Typography } from '@mui/material';
import { styles } from './style';
import { User } from '../../../../common/interfaces';
import { Link, useParams } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../hooks';
import { MediaServices, UserServices } from '../../../../services';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface MediaDescriptionPropsType {
  owner: User;
  title: string;
  description: string;
}

export default function MediaDescription({
  owner,
  title,
  description,
}: MediaDescriptionPropsType) {
  const { id } = useParams();

  const [copied, setCopied] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [userFollowed, setUserFollowed] = useState<boolean>(false);
  const [likeLoading, setLikeLoading] = useState<boolean>(false);
  const [followLoading, setFollowLoading] = useState<boolean>(false);

  const { user } = useAuth();

  const handleCopyURL = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
    });
  };

  const likeMedia = () => {
    if (!id) return;
    setLikeLoading(true);
    MediaServices.likeMedia(id)
      .then(() => setLiked(true))
      .catch()
      .finally(() => setLikeLoading(false));
  };

  const unlikeMedia = () => {
    if (!id) return;
    setLikeLoading(true);
    MediaServices.unlikeMedia(id)
      .then(() => setLiked(false))
      .catch()
      .finally(() => setLikeLoading(false));
  };

  const followUser = () => {
    if (!owner.id || !user) return;
    setFollowLoading(true);
    UserServices.followUser(owner.id)
      .then(() => setUserFollowed(true))
      .catch()
      .finally(() => setFollowLoading(false));
  };

  const unfollowUser = () => {
    if (!owner.id || !user) return;
    setFollowLoading(true);
    UserServices.unfollowUser(owner.id)
      .then(() => setUserFollowed(false))
      .catch()
      .finally(() => setFollowLoading(false));
  };

  useEffect(() => {
    if (!user || !id) return;
    setLikeLoading(true);
    MediaServices.checkUserLiked(id)
      .then((res) => setLiked(res.data))
      .catch()
      .finally(() => setLikeLoading(false));

    setFollowLoading(true);
    UserServices.checkUserFollow(owner.id)
      .then((res) => setUserFollowed(res.data))
      .catch()
      .finally(() => setFollowLoading(false));
  }, [id, owner.id, user]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.titleContainer}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
        <Box sx={styles.ownerInfoContainer}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Link to={`/p/${owner.id}`}>
              <IconButton sx={{ p: 0 }}>
                <Avatar src={owner.photo_url} />
              </IconButton>
            </Link>
            <Box>
              <Link
                to={`/p/${owner.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {owner.display_name}
              </Link>
            </Box>
          </Box>
          {user?.id !== owner.id && (
            <IconButton
              sx={{
                '&:active, &:focus': {
                  outline: 'none',
                  border: 'none',
                },
                gap: 1,
                bgcolor: userFollowed ? 'primary.dark' : 'background.paper',
                borderRadius: 5,
                px: 2,
              }}
              onClick={userFollowed ? unfollowUser : followUser}
              disabled={followLoading}
            >
              {userFollowed ? <VisibilityOffIcon /> : <VisibilityIcon />}
              <Typography>{userFollowed ? 'Followed' : 'Follow'}</Typography>
            </IconButton>
          )}
        </Box>
        <Box sx={styles.actionContainer}>
          <IconButton
            sx={{ ...styles.iconbutton, ...(liked && { bgcolor: 'primary.dark' }) }}
            onClick={liked ? unlikeMedia : likeMedia}
            disabled={likeLoading}
          >
            <ThumbUpIcon />
            <Typography>Like</Typography>
          </IconButton>
          <IconButton sx={{ ...styles.iconbutton }} onClick={handleCopyURL}>
            <ShareIcon />
            <Typography>Share</Typography>
          </IconButton>
        </Box>
      </Box>
      <Box sx={styles.descriptionContainer}>{description}</Box>
      <Snackbar
        open={copied}
        autoHideDuration={1500}
        onClose={() => setCopied(false)}
        message="URL copied to clipboard!"
      />
    </Box>
  );
}
