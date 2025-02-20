import { Avatar, Box, TextField, Typography } from '@mui/material';
import { styles } from './style';
import { useAuth } from '../../../hooks';
import { useState } from 'react';

export default function CommentInput() {
  const { user } = useAuth();
  const [content, setContent] = useState<string>('');

  return (
    <Box sx={styles.container}>
      {user ? (
        <Box sx={styles.inputContainer}>
          <Avatar src={user?.photo_url} />
          <TextField
            variant="standard"
            autoComplete="off"
            multiline
            placeholder="Write something"
            slotProps={{
              inputLabel: { sx: { color: 'lightgray' } },
            }}
            sx={{
              color: 'white',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'lightgray',
                },
              },
              '& .MuiInput-underline:before': {
                borderBottom: '2px solid lightgray',
              },
              flex: 1,
            }}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </Box>
      ) : (
        <Typography>Sign in to write comment</Typography>
      )}
    </Box>
  );
}
