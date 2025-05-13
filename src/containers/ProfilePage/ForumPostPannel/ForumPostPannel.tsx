import { Box } from '@mui/material';
import { styles } from './style';
import { useEffect, useRef, useState } from 'react';
import { ForumPost } from '../../../common/interfaces';
import { useParams } from 'react-router-dom';
import { UserServices } from '../../../services';
import PostPreview from './PostPreview';

export default function ForumPostPannel() {
  const { id } = useParams();

  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [theEnd, setTheEnd] = useState<boolean>(false);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!endRef.current || theEnd || !id) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !theEnd) {
        UserServices.getUserForumPost(id, undefined, page)
          .then((data) => {
            setPosts((posts) => [...posts, ...data.posts]);
            if (page + 1 > data.totalPages) setTheEnd(true);
            else setPage((page) => page + 1);
          })
          .catch();
      }
    });

    observer.observe(endRef.current);

    return () => observer.disconnect();
  }, [id, page, theEnd]);

  return (
    <Box sx={styles.container}>
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
      {!theEnd && <Box ref={endRef} sx={{ height: '1px' }} />}
    </Box>
  );
}
