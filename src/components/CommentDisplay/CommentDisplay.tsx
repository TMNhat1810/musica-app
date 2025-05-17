import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { styles } from './style';
import { Comment, ForumComment } from '../../common/interfaces';
import dayjs from 'dayjs';
import { useState } from 'react';
import ReplyDisplay from './ReplyDisplay';
import CommentInput from '../CommentInput';
import { useAuth } from '../../hooks';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneIcon from '@mui/icons-material/Done';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import ReplyIcon from '@mui/icons-material/Reply';

interface CommentDisplayPropsType {
  data: Comment;
  isOwner?: boolean;
  forum?: boolean;
  replyCallback: (content: string) => Promise<Comment | ForumComment>;
  editCallback: (content: string) => Promise<Comment | ForumComment>;
  deleteCallback: () => Promise<void>;
}

export default function CommentDisplay({
  data,
  isOwner = false,
  forum = false,
  replyCallback,
  editCallback,
  deleteCallback,
}: CommentDisplayPropsType) {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [replying, setReplying] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(data.content);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const menuOpen = Boolean(anchorEl);
  const [deleting, setDeleting] = useState<boolean>(false);

  const { user } = useAuth();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const uploadReply = async (content: string) => {
    replyCallback(content.trim())
      .then(() => {
        setReplying(false);
      })
      .catch();
  };

  const handleEdit = async () => {
    editCallback(editContent.trim())
      .then(() => setEditing(false))
      .catch();
  };

  const handleDelete = async () => {
    setDeleting(true);
    deleteCallback()
      .then(() => setDeleting(false))
      .catch();
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.contentContainer}>
        <Box>
          <Avatar src={data.user.photo_url} />
          {user?.id === data.user_id && (
            <Typography sx={{ mt: 1 }}>(You)</Typography>
          )}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
            <Typography
              sx={[
                isOwner && {
                  backgroundColor: 'grey',
                  px: 0.75,
                  borderRadius: 3,
                },
                { fontWeight: 'bold' },
              ]}
            >
              @{data.user.display_name}
            </Typography>
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
          <Box>
            {!replying && (
              <IconButton
                onClick={() => setReplying(true)}
                sx={{ padding: 0, minWidth: 0 }}
                disabled={!user}
              >
                <ReplyIcon />
                <Typography>Reply</Typography>
              </IconButton>
            )}
            {replying && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CommentInput submit={uploadReply} mode="reply" />
                <IconButton onClick={() => setReplying(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
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
              Edit comment
            </MenuItem>
            <Divider />
            <MenuItem
              disabled={!deleting && data.user_id !== user?.id}
              onClick={handleDelete}
              sx={{ color: 'red' }}
            >
              Delete comment
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Box sx={{ pl: 5 }}>
        {data.replies.length > 0 && (
          <Button
            variant="text"
            onClick={() => setShowReplies((state) => !state)}
            sx={{ textTransform: 'none' }}
          >
            {showReplies ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            {showReplies ? 'Hide' : 'Show ' + data.replies.length} replies
          </Button>
        )}
        {showReplies && (
          <Box sx={styles.replyContainer}>
            {data.replies.map((reply) => (
              <ReplyDisplay key={reply.id} data={reply} forum={forum} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
