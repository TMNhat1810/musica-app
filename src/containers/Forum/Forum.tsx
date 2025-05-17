import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { styles } from './style';
import { useEffect, useState } from 'react';
import { ForumPost } from '../../common/interfaces/forum-post.interface';
import { ForumServices } from '../../services';
import { Link } from 'react-router-dom';
import { typeList } from './types';
import dayjs from 'dayjs';

export default function Forum() {
  const [posts, setPosts] = useState<ForumPost[]>([]);

  useEffect(() => {
    ForumServices.getPosts()
      .then((response) => setPosts(response.data))
      .catch();
  }, []);

  return (
    <Box sx={styles.container}>
      <Container
        maxWidth="md"
        sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
      >
        <Stack direction="column" spacing={2} flexWrap="wrap" sx={{ width: '100%' }}>
          {posts.map((post) => (
            <Box key={post.id} sx={{ width: '100%', marginBottom: 2 }}>
              <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 1,
                  }}
                >
                  <Link to={`post/${post.id}`} style={{}}>
                    <Typography variant="h5" component="div" sx={styles.titleText}>
                      {post.title}
                    </Typography>
                  </Link>
                  <Tooltip
                    title={
                      typeList.find((item) => item.value === post.type)?.description
                    }
                  >
                    <Chip
                      variant="outlined"
                      size="small"
                      label={
                        typeList.find((item) => item.value === post.type)?.label
                      }
                      sx={{
                        color: 'primary.main',
                        borderColor: 'primary.main',
                      }}
                    />
                  </Tooltip>
                  <Typography variant="caption" color="text.primary">
                    {dayjs(post.created_at).fromNow()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={styles.contentText}
                  >
                    {post.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/forum/post/${post.id}`}>
                    <IconButton sx={{ display: 'flex', gap: 1 }}>
                      <CommentIcon />
                      <Typography>{post._count?.ForumComment}</Typography>
                    </IconButton>
                  </Link>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
