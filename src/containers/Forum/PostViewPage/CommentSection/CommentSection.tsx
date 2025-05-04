import { Box, Stack, Typography } from '@mui/material';
import { ForumComment } from '../../../../common/interfaces/forum-comment.interface';
import { useEffect, useState } from 'react';
import CommentInput from '../../../../components/CommentInput';
import { CommentServices, ForumServices } from '../../../../services';
import { useParams } from 'react-router-dom';
import CommentDisplay from '../../../../components/CommentDisplay';
import { socket } from '../../../../socket';

export default function CommentSection() {
  const { id } = useParams();
  const [comments, setComments] = useState<ForumComment[]>([]);

  const handleSubmit = (content: string) => {
    if (content.trim() && id)
      ForumServices.uploadPostComment(id, content.trim()).catch();
  };

  useEffect(() => {
    if (id)
      ForumServices.getPostComments(id)
        .then((data) => setComments(data))
        .catch();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    socket.connect();
    socket.on('connect', () => {
      socket.emit('join', { room: id });

      socket.on('comment:new', (data) => {
        setComments((prev) => [...prev, data]);
      });

      socket.on('comment:update', (data) => {
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === data.id ? { ...comment, content: data.content } : comment,
          ),
        );
      });

      socket.on('comment:delete', (data) => {
        setComments((prev) => prev.filter((comment) => comment.id !== data.id));
      });

      socket.on('reply:new', (data) => {
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === data.reply_to
              ? { ...comment, replies: [...comment.replies, data] }
              : comment,
          ),
        );
      });

      socket.on('reply:update', (data) => {
        setComments((prev) => {
          const parent = prev.filter((comment) => comment.id === data.reply_to)[0];
          parent.replies = parent.replies.map((reply) =>
            reply.id === data.id ? { ...reply, content: data.content } : reply,
          );
          return prev.map((comment) =>
            comment.id === parent.id ? parent : comment,
          );
        });
      });

      socket.on('reply:delete', (data) => {
        setComments((prev) => {
          const parent = prev.filter((comment) => comment.id === data.reply_to)[0];
          parent.replies = parent.replies.filter((reply) => reply.id !== data.id);
          return prev.map((comment) =>
            comment.id === parent.id ? parent : comment,
          );
        });
      });
    });

    return () => {
      socket.emit('leave', { room: id });
      socket.offAny();
      socket.disconnect();
    };
  }, [id]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Comments</Typography>
      <CommentInput submit={handleSubmit} />
      {comments.length > 0 ? (
        <Stack spacing={2} sx={{ mt: 2 }}>
          {comments.map((comment) => (
            <CommentDisplay
              forum
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
