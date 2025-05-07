import { Box } from '@mui/material';
import { styles } from './style';
import { useEffect, useState } from 'react';
import { ForumPost } from '../../../common/interfaces';
import { useParams } from 'react-router-dom';
import { UserServices } from '../../../services';
import PostPreview from './PostPreview';

export default function ForumPostPannel() {
  const { id } = useParams();

  const [posts, setPosts] = useState<ForumPost[]>([]);

  useEffect(() => {
    if (!id) return;

    UserServices.getUserForumPost(id)
      .then((data) => setPosts(data.posts))
      .catch();
  }, [id]);

  return (
    <Box sx={styles.container}>
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </Box>
  );
}
