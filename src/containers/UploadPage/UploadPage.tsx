import { Box } from '@mui/material';
import { styles } from './style';
import UploadForm from './UploadForm';

export default function UploadPage() {
  return (
    <Box sx={styles.container}>
      <UploadForm />
    </Box>
  );
}
