import { Avatar, Box, Typography } from '@mui/material';
import { styles } from './style';
import { Comment } from '../../../common/interfaces';
import dayjs from 'dayjs';

interface CommentDisplayPropsType {
  data: Comment;
}

export default function CommentDisplay({ data }: CommentDisplayPropsType) {
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
      </Box>
    </Box>
  );
}
