import { Avatar, Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { styles } from './style';
import { Media } from '../../common/interfaces';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DEFAULT_THUMBNAIL_URL } from '../../constants';
import { formatDuration } from '../../utils/datetime';

interface MediaDisplayPropsType {
  media: Media;
  horizontal?: boolean;
}

export default function MediaDisplay({ media, horizontal }: MediaDisplayPropsType) {
  const navigate = useNavigate();

  const openMedia = () => {
    navigate('/w/' + media.id, { replace: true });
    window.location.reload();
  };

  const toOwnerProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <Box
      sx={{
        ...styles.container,
        ...(horizontal && { flexDirection: 'row', width: '80%' }),
      }}
      onClick={openMedia}
    >
      <Box sx={styles.imageContainer}>
        <img
          src={media.thumbnail_url || DEFAULT_THUMBNAIL_URL}
          style={{
            ...(horizontal ? { height: '120px' } : { width: '100%' }),
            aspectRatio: '16/9',
            objectFit: 'cover',
            display: 'block',
            borderRadius: 5,
          }}
        />
        <Box sx={styles.durationContainer}>
          <Typography variant="caption">{formatDuration(media.duration)}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          ...styles.mediaInfoContainer,
          ...(horizontal && { paddingLeft: '8px' }),
        }}
      >
        {!horizontal && (
          <Link to={`/p/${media.user.id}`} style={{ textDecoration: 'none' }}>
            <Tooltip title={media.user.display_name}>
              <IconButton
                sx={{ padding: 0, marginTop: '8px' }}
                onClick={toOwnerProfile}
              >
                <Avatar src={media.user.photo_url} />
              </IconButton>
            </Tooltip>
          </Link>
        )}
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
          <Link
            to={`/p/${media.user.id}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Button
              variant="text"
              sx={{
                textTransform: 'none',
                color: 'inherit',
                p: 0,
                justifyContent: 'flex-start',
              }}
            >
              <Typography variant="caption">@{media.user.username}</Typography>
            </Button>
          </Link>
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
