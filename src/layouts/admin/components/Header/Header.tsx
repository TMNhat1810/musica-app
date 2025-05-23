import { AppBar, Box, Typography } from '@mui/material';
import { styles } from './style';
import AuthControl from './AuthControl';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <AppBar sx={styles.container}>
      <Box sx={styles.leftSideContainer}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography sx={{ fontWeight: 'bold' }}>MUSICA</Typography>
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Admin</Typography>
      </Box>
      <AuthControl />
    </AppBar>
  );
}
