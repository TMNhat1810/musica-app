import { Box } from '@mui/material';
import { styles } from './style';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

export default function AdminLayout() {
  return (
    <Box sx={styles.container}>
      <Header />
      <Box sx={styles.contentContainer}>
        <Outlet />
      </Box>
    </Box>
  );
}
