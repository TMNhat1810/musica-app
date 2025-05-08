import {
  Avatar,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { Comment } from '../../../common/interfaces';
import dayjs from 'dayjs';
import { styles } from './style';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneIcon from '@mui/icons-material/Done';
import { useAuth } from '../../../hooks';
import { CommentServices } from '../../../services';

interface ReplyDisplayPropsType {
  data: Comment;
  forum?: boolean;
}

export default function ReplyDisplay({ data, forum }: ReplyDisplayPropsType) {
  const [editing, setEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(data.content);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  const menuOpen = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    if (!forum)
      CommentServices.editMediaComment(data.id, editContent.trim())
        .then(() => setEditing(false))
        .catch();
    else
      CommentServices.editForumComment(data.id, editContent.trim())
        .then(() => setEditing(false))
        .catch();
  };

  const handleDelete = async () => {
    setDeleting(true);
    if (!forum) await CommentServices.deleteMediaComment(data.id);
    else await CommentServices.deleteForumComment(data.id);
    setDeleting(false);
  };

  const { user } = useAuth();

  return (
    <Box sx={styles.container}>
      <Box>
        <Avatar src={data.user.photo_url} sx={{ scale: 0.75 }} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
          <Typography>@{data.user.display_name}</Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'lightgray',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {dayjs(data.updated_at).fromNow()}
          </Typography>
        </Box>
        <Box>
          {!editing && <Typography>{data.content}</Typography>}
          {editing && (
            <TextField
              fullWidth
              multiline
              size="small"
              value={editContent}
              onChange={(event) => {
                setEditContent(event.target.value);
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleEdit}>
                        <DoneIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        </Box>
      </Box>
      <Box sx={{ justifySelf: 'flex-end', pt: 0, pr: 0.5 }}>
        <IconButton
          size="small"
          aria-controls={menuOpen ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={menuOpen ? 'true' : undefined}
          onClick={handleOpenMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={menuOpen}
          onClose={handleCloseMenu}
          onClick={handleCloseMenu}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem
            disabled={data.user_id !== user?.id}
            onClick={() => setEditing(true)}
          >
            Edit Reply
          </MenuItem>
          <Divider />
          <MenuItem
            disabled={!deleting && data.user_id !== user?.id}
            onClick={handleDelete}
            sx={{ color: 'red' }}
          >
            Delete Reply
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
