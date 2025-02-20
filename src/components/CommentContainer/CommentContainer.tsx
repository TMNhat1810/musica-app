import { Box } from '@mui/material';
import { styles } from './style';
import CommentInput from '../CommentSection/CommentInput/CommentInput';
import CommentSection from '../CommentSection';

export default function CommentContainer() {
  return (
    <Box sx={styles.container}>
      <CommentInput />
      <CommentSection />
    </Box>
  );
}
