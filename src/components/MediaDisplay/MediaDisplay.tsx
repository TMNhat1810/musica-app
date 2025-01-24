import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material';
import { styles } from './style';
import { Media } from '../../common/interfaces';
import dayjs from 'dayjs';

interface MediaDisplayPropsType {
  media: Media;
}

export default function MediaDisplay({ media }: MediaDisplayPropsType) {
  const openMedia = () => {};

  const toOwnerProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <Box sx={styles.container} onClick={openMedia}>
      <Box sx={styles.imageContainer}>
        <img
          src={media.thumbnail_url}
          style={{
            width: '280px',
            height: '160px',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box sx={styles.mediaInfoContainer}>
        <Box>
          <Tooltip title={media.user.display_name}>
            <IconButton
              sx={{ padding: 0, marginTop: '8px' }}
              onClick={toOwnerProfile}
            >
              <Avatar src={media.user.photo_url} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Box>
            <Tooltip title={media.title}>
              <Typography
                variant="body2"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {media.title}
              </Typography>
            </Tooltip>
          </Box>
          <Typography variant="caption">@{media.user.username}</Typography>
          <Box>
            <Typography variant="caption" color="lightgray">
              {dayjs(media.created_at).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
