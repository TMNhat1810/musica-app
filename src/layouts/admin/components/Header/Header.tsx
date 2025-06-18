import { AppBar, Box, Typography } from '@mui/material';
import { styles } from './style';
import { Link } from 'react-router-dom';
import AuthControl from '../../../../components/Header/AuthControl';

export default function Header() {
  return (
    <AppBar sx={styles.container}>
      <Box sx={styles.leftSideContainer}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography sx={{ fontWeight: 'bold' }}>MUSICA</Typography>
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Admin</Typography>
      </Box>
      <AuthControl showCreateButton={false} showNotification={false} />
    </AppBar>
  );
}
