import { Box, Button, Chip, TextField, Tooltip, Typography } from '@mui/material';
import { styles } from './style';
import { useState } from 'react';

const typeList = [
  {
    value: 'qa',
    label: 'Q&A',
    description: 'Question and answer.',
  },
  {
    value: 'sharing',
    label: 'Sharing',
    description: 'Share insights and experiences.',
  },
  {
    value: 'discussion',
    label: 'Discussion',
    description: 'Discuss post.',
  },
  {
    value: 'announcement',
    label: 'Announcement',
    description: 'News and updates.',
  },
  {
    value: 'showcase',
    label: 'Showcase',
    description: 'Projects or achievements.',
  },
  {
    value: 'event',
    label: 'Event',
    description: 'Information about upcoming events.',
  },
  {
    value: 'j4f',
    label: 'J4F',
    description: 'Fun posts or memes...',
  },
];

export default function PostWritingPage() {
  const [title, setTitle] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [content, setContent] = useState<string>('');
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
          <Typography>Attachments:</Typography>
        </Box>
        <Box>
          <Button variant="outlined">Upload</Button>
        </Box>
      </Box>
    </Box>
  );
}
