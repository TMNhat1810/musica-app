import { Box, Stack, Typography } from '@mui/material';
import { ForumComment } from '../../../../common/interfaces/forum-comment.interface';
import { useState } from 'react';
import Comment from './Comment';
import CommentInput from '../../../../components/CommentInput';
import { ForumServices } from '../../../../services';
import { useParams } from 'react-router-dom';

export default function CommentSection() {
  const { id } = useParams();
  const [comments, setComments] = useState<ForumComment[]>([]);

  const handleSubmit = (content: string) => {
    if (content.trim() && id)
      ForumServices.uploadPostComment(id, content.trim())
        .then((data) => setComments([...comments, data]))
        .catch();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Comments</Typography>
      <CommentInput submit={handleSubmit} />
      {comments.length > 0 ? (
        <Stack spacing={2} sx={{ mt: 2 }}>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No comments yet.
        </Typography>
      )}
    </Box>
  );
}
