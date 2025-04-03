import { Avatar, Box, Stack, Typography } from '@mui/material';
import { ForumComment } from '../../../../common/interfaces/forum-comment.interface';

interface CommentPropsType {
  comment: ForumComment;
}

export default function Comment({ comment }: CommentPropsType) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar src={comment.user.photo_url} alt={comment.user.display_name} />
      <Box>
        <Typography fontWeight="bold">{comment.user.display_name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(comment.created_at).toLocaleString()}
        </Typography>
        <Typography sx={{ mt: 1, whiteSpace: 'pre-line' }}>
          {comment.content}
        </Typography>
        {comment.replies.length > 0 && (
          <Box sx={{ pl: 4, mt: 1 }}>
            {comment.replies.map((reply) => (
              <Comment key={reply.id} comment={reply} />
            ))}
          </Box>
        )}
      </Box>
    </Stack>
  );
}
