import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ForumIcon from '@mui/icons-material/Forum';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DrawerControl() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  return (
    <Box>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          '&:focus, &:active, &:hover': {
            outline: 'none',
            border: 'none',
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            <ListItem>
              <ListItemButton onClick={() => navigate('/')}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton onClick={() => navigate('/forum')}>
                <ListItemIcon>
                  <ForumIcon />
                </ListItemIcon>
                <ListItemText>Forum</ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton onClick={() => navigate('/follow')}>
                <ListItemIcon>
                  <SubscriptionsIcon />
                </ListItemIcon>
                <ListItemText>Your followings</ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
