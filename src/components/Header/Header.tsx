import { Box, Typography } from '@mui/material';
import { styles } from './style';
import AuthControl from './AuthControl';
import { Link } from 'react-router-dom';
import DrawerControl from './DrawerControl';
import SearchBar from '../SearchBar';

interface HeaderPropsType {
  forumMode?: boolean;
}

export default function Header({ forumMode }: HeaderPropsType) {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.leftSideContainer}>
        <DrawerControl />
        <Link to="/" style={{ textDecoration: 'none' }}>
          MUSICA
        </Link>
        {forumMode && <Typography>Forum</Typography>}
      </Box>
      {!forumMode && <SearchBar />}
      <AuthControl />
    </Box>
  );
}
