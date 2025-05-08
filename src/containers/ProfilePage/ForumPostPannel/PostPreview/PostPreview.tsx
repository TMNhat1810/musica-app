import {
  Box,
  Typography,
  Avatar,
  Stack,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';
import dayjs from 'dayjs';
import { ForumPost } from '../../../../common/interfaces';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link } from 'react-router-dom';
import AutoLinkText from '../../../../components/AutoLinkText';

interface PostPreviewPropsType {
  post: ForumPost;
}

export default function PostPreview({ post }: PostPreviewPropsType) {
  return (
    <Card
      sx={{ width: '100%', maxWidth: 800, border: '2px solid', borderRadius: 5 }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={post.user.photo_url} />
          <Box>
            <Typography variant="subtitle1">{post.user.display_name}</Typography>
            <Typography variant="caption" color="text.primary">
              {dayjs(post.created_at).fromNow()}
            </Typography>
          </Box>
        </Stack>
        <Box mt={2}>
          <Typography variant="h6" mb={1}>
            {post.title}
          </Typography>
          <AutoLinkText text={post.content} />
        </Box>
        {post.images?.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" mt={2}>
            {post.images.map((img) => (
              <CardMedia
                key={img.id}
                component="img"
                src={img.url}
                sx={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: 1,
                }}
              />
            ))}
          </Stack>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <Link to={`/forum/post/${post.id}`}>
          <IconButton sx={{ gap: 1 }}>
            <ChatBubbleOutlineIcon />
            <Typography>{post._count?.ForumComment || 0}</Typography>
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}
