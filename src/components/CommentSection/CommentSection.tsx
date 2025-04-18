import { Box, Typography } from '@mui/material';
import { styles } from './style';
import CommentDisplay from '../CommentDisplay/CommentDisplay';
import { Comment } from '../../common/interfaces';
import { CommentServices } from '../../services';

interface CommentSection {
  data: Comment[];
}

export default function CommentSection({ data }: CommentSection) {
  return (
    <Box sx={styles.container}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold' }}
      >{`${data.length} comment${data.length > 1 ? 's' : ''}`}</Typography>
      <Box sx={styles.commentPannel}>
        {data.map((comment) => (
          <CommentDisplay
            key={comment.id}
            data={comment}
            replyCallback={async (content: string) =>
              CommentServices.uploadReply(comment.id, content)
            }
          />
        ))}
      </Box>
    </Box>
  );
}
