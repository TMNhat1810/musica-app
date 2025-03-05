import { Box } from '@mui/material';
import { styles } from './style';
import SuggestSection from './SuggestSection';
import MediaView from './MediaView/MediaView';

export default function MediaViewPage() {
  return (
    <Box sx={styles.container}>
      <MediaView />
      <SuggestSection />
    </Box>
  );
}
