import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { styles } from './style';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ForumPost } from '../../common/interfaces/forum-post.interface';
import { ForumServices } from '../../services';
import { Link } from 'react-router-dom';
import { typeList } from './types';
import { useAuth } from '../../hooks';

export default function Forum() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    ForumServices.getPosts()
      .then((response) => setPosts(response.data))
      .catch();
  }, []);

  return (
    <Box sx={styles.container}>
      <Button
        variant="outlined"
        sx={{}}
        onClick={() => {
          navigate('new');
        }}
        disabled={!isAuthenticated}
      >
        <AddIcon />
        Add Post
      </Button>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {posts.map((post) => (
          <Box
            key={post.id}
            sx={{ width: { xs: '100%', sm: '48%', md: '30%' }, marginBottom: 2 }}
          >
            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Link to={`post/${post.id}`} style={{ color: 'inherit' }}>
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
                    label={typeList.find((item) => item.value === post.type)?.label}
                    sx={{ color: 'primary.main', borderColor: 'primary.main' }}
                  />
                </Tooltip>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={styles.contentText}
                >
                  {post.content}
                </Typography>
                <Typography variant="caption" color="text.primary">
                  Created at: {new Date(post.created_at).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
