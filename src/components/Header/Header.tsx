import { AppBar, Box, IconButton, Typography } from '@mui/material';
import { styles } from './style';
import AuthControl from './AuthControl';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';

interface HeaderPropsType {
  forumMode?: boolean;
  onMenuClick: () => void;
}

export default function Header({ forumMode, onMenuClick }: HeaderPropsType) {
  const { t } = useTranslation();

  return (
    <AppBar sx={styles.container}>
      <Box sx={styles.leftSideContainer}>
        <IconButton
          onClick={onMenuClick}
          sx={{
            '&:focus, &:active, &:hover': {
              outline: 'none',
              border: 'none',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Link to={forumMode ? '/forum' : '/'} style={{ textDecoration: 'none' }}>
          <Typography sx={{ fontWeight: 'bold' }}>MUSICA</Typography>
        </Link>
        {forumMode && (
          <Typography sx={{ color: 'text.primary' }}>{t('forum')}</Typography>
        )}
      </Box>
      {!forumMode && <SearchBar />}
      <AuthControl forumMode={forumMode} />
    </AppBar>
  );
}
