import { Box, Typography } from '@mui/material';
import { styles } from './style';
import { useEffect, useState } from 'react';
import { MediaServices } from '../../services';
import { useParams } from 'react-router-dom';
import CommentDisplay from './CommentDisplay/CommentDisplay';
import { Comment } from '../../common/interfaces';

export default function CommentSection() {
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (!id) return;
    MediaServices.getCommentsByMediaId(id)
      .then((data) => setComments(data))
      .catch();
  }, [id]);
  return (
    <Box sx={styles.container}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold' }}
      >{`${comments.length} comment${comments.length > 1 ? 's' : ''}`}</Typography>
      {comments.map((comment) => (
        <CommentDisplay key={comment.id} data={comment} />
      ))}
    </Box>
  );
}
