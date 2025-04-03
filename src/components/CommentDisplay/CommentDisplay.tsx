import { Avatar, Box, Button, Typography } from '@mui/material';
import { styles } from './style';
import { Comment, ForumComment } from '../../common/interfaces';
import dayjs from 'dayjs';
import { useState } from 'react';
import ReplyDisplay from './ReplyDisplay';
import CommentInput from '../CommentInput';
import { useAuth } from '../../hooks';

interface CommentDisplayPropsType {
  data: Comment;
  replyCallback: (content: string) => Promise<Comment | ForumComment>;
}

export default function CommentDisplay({
  data,
  replyCallback,
}: CommentDisplayPropsType) {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [replying, setReplying] = useState<boolean>(false);
  const [replies, setReplies] = useState<Comment[] | ForumComment[]>(
    data.replies || [],
  );

  const { user } = useAuth();

  const uploadReply = async (content: string) => {
    replyCallback(content.trim())
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
      <Box sx={{ flex: 1 }}>
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
            <Button
              variant="text"
              onClick={() => setReplying(true)}
              sx={{ textTransform: 'none', padding: 0, minWidth: 0 }}
              disabled={!user}
            >
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
