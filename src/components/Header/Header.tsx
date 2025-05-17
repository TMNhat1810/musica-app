import { AppBar, Box, Typography } from '@mui/material';
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
    <AppBar sx={styles.container}>
      <Box sx={styles.leftSideContainer}>
        <DrawerControl />
        <Link to={forumMode ? '/forum' : '/'} style={{ textDecoration: 'none' }}>
          <Typography sx={{ fontWeight: 'bold' }}>MUSICA</Typography>
        </Link>
        {forumMode && <Typography sx={{ color: 'text.primary' }}>Forum</Typography>}
      </Box>
      {!forumMode && <SearchBar />}
      <AuthControl forumMode={forumMode} />
    </AppBar>
  );
}
