import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ForumImage,
  ForumPost,
} from '../../../common/interfaces/forum-post.interface';
import { ForumServices } from '../../../services';
import PostSkeleton from '../../../components/Skeleton/Post';
import ImagePreview from './ImagePreview';
import CommentSection from './CommentSection';
import AutoLinkText from '../../../components/AutoLinkText';

export default function PostViewPage() {
  const { id } = useParams();
  const [post, setPost] = useState<ForumPost | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  useEffect(() => {
    if (id)
      ForumServices.getPostById(id)
        .then((data) => setPost(data))
        .catch();
  }, [id]);

  return !post ? (
    <PostSkeleton />
  ) : (
    <Box sx={{ maxWidth: 800, margin: 'auto', p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Avatar src={post.user.photo_url} alt={post.user.display_name} />
        <Typography variant="h6">{post.user.display_name}</Typography>
      </Stack>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {post.title}
      </Typography>
      <AutoLinkText text={post.content} />
      {post.images.length > 0 && (
        <Stack direction="row" spacing={1} mt={3}>
          {post.images.map((image: ForumImage, index: number) => (
            <img
              key={image.id}
              src={image.url}
              alt="post"
              style={{ width: 80, height: 60, cursor: 'pointer', borderRadius: 5 }}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </Stack>
      )}
      <Divider sx={{ my: 3 }} />
      <CommentSection />
      <ImagePreview
        open={open}
        images={post.images.map((img) => img.url)}
        currentIndex={selectedIndex}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
}
