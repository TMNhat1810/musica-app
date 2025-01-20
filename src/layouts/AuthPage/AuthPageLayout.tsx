import { Box } from '@mui/material';
import { styles } from './style';
import { Outlet } from 'react-router-dom';
import landingLogo from '../../assets/logo-large.png';

export default function AuthPageLayout() {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.contentContainer}>
        <Box sx={styles.sidePanel}>
          <img src={landingLogo} style={{ maxWidth: '500px' }} />
        </Box>
        <Box sx={styles.formContainer}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
