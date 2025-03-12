import { Box } from '@mui/material';
import { styles } from './style';
import AuthControl from './AuthControl';
import { Link } from 'react-router-dom';
import DrawerControl from './DrawerControl';
import SearchBar from '../SearchBar';

export default function Header() {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.leftSideContainer}>
        <DrawerControl />
        <Link to="/" style={{ textDecoration: 'none' }}>
          Logo
        </Link>
      </Box>
      <SearchBar />
      <AuthControl />
    </Box>
  );
}
