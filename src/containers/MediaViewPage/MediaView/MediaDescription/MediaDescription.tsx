import { Avatar, Box, IconButton, Snackbar, Typography } from '@mui/material';
import { styles } from './style';
import { User } from '../../../../common/interfaces';
import { Link, useParams } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../hooks';
import { MediaServices } from '../../../../services';

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

  const { user } = useAuth();

  const handleCopyURL = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
    });
  };

  const likeMedia = () => {
    if (!id) return;
    MediaServices.likeMedia(id)
      .then(() => setLiked(true))
      .catch();
  };

  const unlikeMedia = () => {
    if (!id) return;
    MediaServices.unlikeMedia(id)
      .then(() => setLiked(false))
      .catch();
  };

  useEffect(() => {
    if (!user || !id) return;
    MediaServices.checkUserLiked(id)
      .then((res) => {
        setLiked(res.data);
      })
      .catch();
  }, [id, user]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.titleContainer}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
        <Box sx={styles.ownerInfoContainer}>
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
        <Box sx={styles.actionContainer}>
          <IconButton
            sx={{ ...styles.iconbutton, ...(liked && { bgcolor: 'primary.dark' }) }}
            onClick={liked ? unlikeMedia : likeMedia}
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
