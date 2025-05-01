import {
  Box,
  Button,
  Chip,
  CircularProgress,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { styles } from './style';
import { useEffect, useRef, useState } from 'react';
import ImageUploader, { MultipleImageUploaderRef } from './ImageUploader';
import { ForumServices } from '../../../services';
import { useNavigate, useParams } from 'react-router-dom';
import { typeList } from '../types';
import { useAuth } from '../../../hooks';
import { ForumPost } from '../../../common/interfaces';

export default function PostEditPage() {
  const [title, setTitle] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const imageRef = useRef<MultipleImageUploaderRef>(null);
  const orgRef = useRef<ForumPost | null>(null);

  const uploadPost = async () => {
    setLoading(true);
    if (id)
      ForumServices.updatePost(
        id,
        title,
        type,
        content,
        imageRef.current?.images,
        imageRef.current?.deleteIds,
      )
        .then(() => {
          navigate('/forum/post/' + id);
        })
        .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!user) {
      navigate('/forum/post/' + id);
      return;
    }
    if (id) {
      ForumServices.getPostById(id)
        .then((data) => {
          orgRef.current = data;
        })
        .then(() => {
          if (orgRef.current) {
            if (orgRef.current.user.id !== user.id) {
              navigate('/forum/post/' + orgRef.current.id);
              return;
            }
            setTitle(orgRef.current.title);
            setContent(orgRef.current.content);
            setType(orgRef.current.type);
          }
        })
        .catch();
    }
  }, [id, navigate, user]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.formContainer}>
        <Box>
          <Typography>Title</Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Your title here..."
            fullWidth
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Box>
        <Box>
          <Typography>Type:</Typography>
          <Box sx={styles.chipContainer}>
            {typeList.map((item) => (
              <Tooltip key={item.value} title={item.description}>
                <Chip
                  variant={type === item.value ? 'filled' : 'outlined'}
                  label={item.label}
                  size="small"
                  sx={[
                    type === item.value
                      ? {
                          backgroundColor: 'primary.main',
                          color: 'black',
                          ':hover': { backgroundColor: 'primary.main' },
                        }
                      : {
                          ':hover': {
                            color: 'primary.main',
                            borderColor: 'primary.main',
                          },
                        },
                  ]}
                  onClick={() => {
                    setType(type === item.value ? '' : item.value);
                  }}
                />
              </Tooltip>
            ))}
          </Box>
        </Box>
        <Box>
          <Typography>Content</Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Your content here..."
            fullWidth
            multiline
            minRows={5}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </Box>
        <Box>
          <ImageUploader ref={imageRef} orgImages={orgRef.current?.images} />
        </Box>
        <Box>
          {!loading && (
            <Button variant="outlined" onClick={uploadPost}>
              Upload
            </Button>
          )}
          {loading && <CircularProgress />}
        </Box>
      </Box>
    </Box>
  );
}
