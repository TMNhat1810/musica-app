import { Typography, Box, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h3">404 - Page Not Found</Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
      </Typography>
      <Link to="/">
        <IconButton
          sx={{
            borderRadius: 5,
            backgroundColor: 'background.paper',
            color: 'primary.main',
          }}
        >
          <HomeIcon sx={{ mr: 0.5 }} />
          <Typography>Home</Typography>
        </IconButton>
      </Link>
    </Box>
  );
}
