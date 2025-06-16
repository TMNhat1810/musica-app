import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { styles } from './style';
import HomeIcon from '@mui/icons-material/Home';
import ForumIcon from '@mui/icons-material/Forum';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { useLocation, useNavigate } from 'react-router-dom';

interface SideMenuPropsType {
  expand: boolean;
}

export default function SideMenu({ expand = true }: SideMenuPropsType) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={styles.container}>
      {expand && (
        <img
          src="/musica-logo.png"
          alt="logo"
          style={{ width: '200px', height: '200px' }}
        />
      )}
      <List>
        <ListItem sx={{ p: 0 }}>
          <ListItemButton
            sx={{ display: 'flex', justifyContent: 'center' }}
            onClick={() => navigate('/')}
          >
            {expand ? (
              <>
                <ListItemIcon
                  sx={{
                    ...(location.pathname === '/' && { color: 'primary.main' }),
                  }}
                >
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    ...(location.pathname === '/' && { color: 'primary.main' }),
                  }}
                >
                  Home
                </ListItemText>
              </>
            ) : (
              <Box
                sx={{
                  ...styles.collapseButton,
                  ...(location.pathname === '/' && { color: 'primary.main' }),
                }}
              >
                <HomeIcon fontSize="large" />
                <Typography variant="caption">Home</Typography>
              </Box>
            )}
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ p: 0 }}>
          <ListItemButton
            sx={{ display: 'flex', justifyContent: 'center' }}
            onClick={() => navigate('/forum')}
          >
            {expand ? (
              <>
                <ListItemIcon
                  sx={{
                    ...(location.pathname === '/forum' && { color: 'primary.main' }),
                  }}
                >
                  <ForumIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    ...(location.pathname === '/forum' && { color: 'primary.main' }),
                  }}
                >
                  Forum
                </ListItemText>
              </>
            ) : (
              <Box
                sx={{
                  ...styles.collapseButton,
                  ...(location.pathname === '/forum' && { color: 'primary.main' }),
                }}
              >
                <ForumIcon fontSize="large" />
                <Typography variant="caption">Forum</Typography>
              </Box>
            )}
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ p: 0 }}>
          <ListItemButton
            sx={{ display: 'flex', justifyContent: 'center' }}
            onClick={() => navigate('/follow')}
          >
            {expand ? (
              <>
                <ListItemIcon
                  sx={{
                    ...(location.pathname === '/follow' && {
                      color: 'primary.main',
                    }),
                  }}
                >
                  <SubscriptionsIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    ...(location.pathname === '/follow' && {
                      color: 'primary.main',
                    }),
                  }}
                >
                  Followings
                </ListItemText>
              </>
            ) : (
              <Box
                sx={{
                  ...styles.collapseButton,
                  ...(location.pathname === '/follow' && { color: 'primary.main' }),
                }}
              >
                <SubscriptionsIcon fontSize="large" />
                <Typography variant="caption">Followings</Typography>
              </Box>
            )}
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
