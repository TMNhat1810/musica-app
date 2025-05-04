import { Box, Typography } from '@mui/material';
import { styles } from './style';
import CommentDisplay from '../CommentDisplay';
import { Comment } from '../../common/interfaces';
import { CommentServices, MediaServices } from '../../services';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentInput from '../CommentInput';
import { socket } from '../../socket';

interface CommentSectionPropsType {
  mediaOwnerId: string;
}

export default function CommentSection({ mediaOwnerId }: CommentSectionPropsType) {
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>([]);

  const uploadComment = async (content: string) => {
    if (!id || !content) return;
    MediaServices.uploadComment(id, content).catch();
  };

  useEffect(() => {
    if (!id) return;
    MediaServices.getCommentsByMediaId(id)
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
    <Box sx={styles.container}>
      <CommentInput submit={uploadComment} />
      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold' }}
      >{`${comments.length} comment${comments.length > 1 ? 's' : ''}`}</Typography>
      <Box sx={styles.commentPannel}>
        {comments.map((comment) => (
          <CommentDisplay
            key={comment.id}
            data={comment}
            isOwner={mediaOwnerId === comment.user_id}
            replyCallback={async (content: string) =>
              CommentServices.uploadReply(comment.id, content)
            }
            editCallback={async (content: string) => {
              return CommentServices.editMediaComment(comment.id, content).then(
                (data) => {
                  return data;
                },
              );
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
