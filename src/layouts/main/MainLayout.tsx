import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { styles } from './style';
import Header from '../../components/Header';

export default function MainLayout() {
  return (
    <Box sx={styles.container}>
      <Header />
      <Box sx={styles.contentContainer}>
        <Outlet />
      </Box>
    </Box>
  );
}
