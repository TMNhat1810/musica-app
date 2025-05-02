import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ForumImage,
  ForumPost,
} from '../../../common/interfaces/forum-post.interface';
import { ForumServices } from '../../../services';
import PostSkeleton from '../../../components/Skeleton/Post';
import ImagePreview from './ImagePreview';
import CommentSection from './CommentSection';
import AutoLinkText from '../../../components/AutoLinkText';
import { useAuth } from '../../../hooks';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function PostViewPage() {
  const { id } = useParams();
  const [post, setPost] = useState<ForumPost | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleDelete = async () => {
    if (post)
      ForumServices.deletePost(post.id)
        .then(() => {
          setOpen(false);
          navigate(`/p/${user?.id}?tab=post`);
        })
        .catch();
  };

  useEffect(() => {
    if (id)
      ForumServices.getPostById(id)
        .then((data) => setPost(data))
        .catch();
  }, [id]);

  return !post ? (
    <PostSkeleton />
  ) : (
    <Box sx={{ maxWidth: 800, margin: 'auto', p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          {post.title}
        </Typography>
        {user?.id === post.user.id && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Tooltip title="Edit">
              <Link to="edit">
                <IconButton
                  sx={{ p: 0.5, backgroundColor: 'primary.main', borderRadius: 2 }}
                >
                  <EditIcon />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                sx={{ p: 0.5, backgroundColor: 'red', borderRadius: 2 }}
                onClick={() => setDeleteConfirmOpen(true)}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
            <Dialog
              open={deleteConfirmOpen}
              onClose={() => setDeleteConfirmOpen(false)}
            >
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogActions>
                <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
                <Button onClick={handleDelete} color="error">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </Box>
      <Typography variant="caption">{dayjs(post.created_at).fromNow()}</Typography>
      <Stack direction="row" alignItems="center" spacing={2} mt={2} mb={2}>
        <Avatar src={post.user.photo_url} alt={post.user.display_name} />
        <Typography variant="h6">{post.user.display_name}</Typography>
      </Stack>
      <AutoLinkText text={post.content} />
      {post.images.length > 0 && (
        <Stack direction="row" spacing={1} mt={3}>
          {post.images.map((image: ForumImage, index: number) => (
            <img
              key={image.id}
              src={image.url}
              alt="post"
              style={{ width: 80, height: 60, cursor: 'pointer', borderRadius: 5 }}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </Stack>
      )}
      <Divider sx={{ my: 3 }} />
      <CommentSection />
      <ImagePreview
        open={open}
        images={post.images.map((img) => img.url)}
        currentIndex={selectedIndex}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
}
