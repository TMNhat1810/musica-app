import { Box, Stack, Typography } from '@mui/material';
import { ForumComment } from '../../../../common/interfaces/forum-comment.interface';
import { useEffect, useState } from 'react';
import CommentInput from '../../../../components/CommentInput';
import { CommentServices, ForumServices } from '../../../../services';
import { useParams } from 'react-router-dom';
import CommentDisplay from '../../../../components/CommentDisplay';

export default function CommentSection() {
  const { id } = useParams();
  const [comments, setComments] = useState<ForumComment[]>([]);

  const handleSubmit = (content: string) => {
    if (content.trim() && id)
      ForumServices.uploadPostComment(id, content.trim())
        .then((data) => setComments([...comments, data]))
        .catch();
  };

  useEffect(() => {
    if (id)
      ForumServices.getPostComments(id)
        .then((data) => setComments(data))
        .catch();
  }, [id]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Comments</Typography>
      <CommentInput submit={handleSubmit} />
      {comments.length > 0 ? (
        <Stack spacing={2} sx={{ mt: 2 }}>
          {comments.map((comment) => (
            <CommentDisplay
              key={comment.id}
              data={comment}
              replyCallback={async (content: string) =>
                ForumServices.uploadCommentReply(comment.id, content)
              }
              editCallback={async (content: string) =>
                CommentServices.editForumComment(comment.id, content).then(
                  (data) => {
                    return data;
                  },
                )
              }
            />
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
