import { Avatar, Box, Typography } from '@mui/material';
import { Comment } from '../../../../common/interfaces';
import dayjs from 'dayjs';
import { styles } from './style';

interface ReplyDisplayPropsType {
  data: Comment;
}

export default function ReplyDisplay({ data }: ReplyDisplayPropsType) {
  return (
    <Box sx={styles.container}>
      <Box>
        <Avatar src={data.user.photo_url} sx={{ scale: 0.75 }} />
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
