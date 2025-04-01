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
import { useRef, useState } from 'react';
import ImageUploader, { MultipleImageUploaderRef } from './ImageUploader';
import { ForumServices } from '../../../services';
import { useNavigate } from 'react-router-dom';
import { typeList } from '../types';

export default function PostWritingPage() {
  const [title, setTitle] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const imageRef = useRef<MultipleImageUploaderRef>(null);

  const navigate = useNavigate();

  const uploadPost = async () => {
    setLoading(true);
    ForumServices.uploadPost(title, type, content, imageRef.current?.images)
      .then(() => {
        navigate('/forum');
      })
      .finally(() => setLoading(false));
  };

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
              <Tooltip title={item.description}>
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
          <ImageUploader ref={imageRef} />
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
