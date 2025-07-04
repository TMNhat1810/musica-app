import { Avatar, Box, IconButton, Snackbar, Typography } from '@mui/material';
import { styles } from './style';
import { User } from '../../../../common/interfaces';
import { Link, useParams } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../hooks';
import { MediaServices } from '../../../../services';
import FollowButton from '../../../../components/FollowButton';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

interface MediaDescriptionPropsType {
  owner: User;
  title: string;
  description: string;
  view_count: number;
  created_at: Date;
}

export default function MediaDescription({
  owner,
  title,
  description,
  view_count,
  created_at,
}: MediaDescriptionPropsType) {
  const { id } = useParams();

  const [copied, setCopied] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeLoading, setLikeLoading] = useState<boolean>(false);

  const { user } = useAuth();
  const { t } = useTranslation();

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

  useEffect(() => {
    if (!user || !id) return;
    setLikeLoading(true);
    MediaServices.checkUserLiked(id)
      .then((res) => setLiked(res.data))
      .catch()
      .finally(() => setLikeLoading(false));
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
          {user && user?.id !== owner.id && <FollowButton target_id={owner.id} />}
        </Box>
        <Box sx={styles.actionContainer}>
          <IconButton
            sx={{ ...styles.iconbutton, ...(liked && { bgcolor: 'primary.dark' }) }}
            onClick={liked ? unlikeMedia : likeMedia}
            disabled={likeLoading}
          >
            <ThumbUpIcon />
            <Typography>{t('like')}</Typography>
          </IconButton>
          <IconButton sx={{ ...styles.iconbutton }} onClick={handleCopyURL}>
            <ShareIcon />
            <Typography>{t('share')}</Typography>
          </IconButton>
        </Box>
      </Box>
      <Box sx={styles.descriptionContainer}>
        <Typography>
          {view_count} {t('views')} • {dayjs(created_at).fromNow()}
        </Typography>
        <Typography>{description}</Typography>
      </Box>
      <Snackbar
        open={copied}
        autoHideDuration={1500}
        onClose={() => setCopied(false)}
        message="URL copied to clipboard!"
      />
    </Box>
  );
}
