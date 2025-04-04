import { Avatar, Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { styles } from './style';
import { Media } from '../../common/interfaces';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface MediaDisplayPropsType {
  media: Media;
  horizontal?: boolean;
}

export default function MediaDisplay({ media, horizontal }: MediaDisplayPropsType) {
  const navigate = useNavigate();

  const openMedia = () => {
    navigate('/w/' + media.id);
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
          src={media.thumbnail_url}
          style={{
            width: horizontal ? '200px' : '280px',
            height: horizontal ? '120px' : '160px',
            objectFit: 'cover',
          }}
        />
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
