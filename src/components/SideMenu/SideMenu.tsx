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
import { useNavigate } from 'react-router-dom';

interface SideMenuPropsType {
  expand: boolean;
}

export default function SideMenu({ expand = true }: SideMenuPropsType) {
  const navigate = useNavigate();

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
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
              </>
            ) : (
              <Box sx={styles.collapseButton}>
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
                <ListItemIcon>
                  <ForumIcon />
                </ListItemIcon>
                <ListItemText>Forum</ListItemText>
              </>
            ) : (
              <Box sx={styles.collapseButton}>
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
                <ListItemIcon>
                  <SubscriptionsIcon />
                </ListItemIcon>
                <ListItemText>Followings</ListItemText>
              </>
            ) : (
              <Box sx={styles.collapseButton}>
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
