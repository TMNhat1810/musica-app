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
    MediaServices.uploadComment(id, content)
      .then((data) => {
        setComments([...comments, data]);
      })
      .catch();
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
    });

    return () => {
      socket.emit('leave', { room: id });
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
