import { Box } from '@mui/material';
import { styles } from './style';
import AuthControl from './AuthControl';

export default function Header() {
  return (
    <Box sx={styles.container}>
      <Box>Logo</Box>
      <AuthControl />
    </Box>
  );
}
