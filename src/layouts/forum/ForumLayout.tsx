import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import { styles } from './style';

export default function ForumLayout() {
  return (
    <Box sx={styles.container}>
      <Header forumMode />
      <Box sx={styles.contentContainer}>
        <Outlet />
      </Box>
    </Box>
  );
}
