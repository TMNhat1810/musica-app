import { Avatar, Box, Button, Typography } from '@mui/material';
import { styles } from './style';
import { Comment } from '../../../common/interfaces';
import dayjs from 'dayjs';
import { useState } from 'react';
import ReplyDisplay from './ReplyDisplay';
import { CommentServices } from '../../../services';
import CommentInput from '../CommentInput/CommentInput';

interface CommentDisplayPropsType {
  data: Comment;
}

export default function CommentDisplay({ data }: CommentDisplayPropsType) {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [replying, setReplying] = useState<boolean>(false);
  const [replies, setReplies] = useState<Comment[]>(data.replies || []);

  const uploadReply = async (content: string) => {
    CommentServices.uploadReply(data.id, content)
      .then((data) => {
        setReplies([...replies, data]);
        setReplying(false);
      })
      .catch();
  };

  return (
    <Box sx={styles.container}>
      <Box>
        <Avatar src={data.user.photo_url} />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
          <Typography>@{data.user.display_name}</Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'lightgray',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {dayjs(data.updated_at).fromNow()}
          </Typography>
        </Box>
        <Box>
          <Typography>{data.content}</Typography>
        </Box>
        <Box>
          {!replying && (
            <Button variant="text" onClick={() => setReplying(true)}>
              Reply
            </Button>
          )}
          {replying && <CommentInput submit={uploadReply} mode="reply" />}
        </Box>
        <Box sx={{ mt: '5px' }}>
          {replies.length > 0 && !showReplies && (
            <Button variant="text" onClick={() => setShowReplies(true)}>
              {replies.length} Replies
            </Button>
          )}
          {showReplies && (
            <Box>
              {replies.map((reply) => (
                <ReplyDisplay key={reply.id} data={reply} />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
