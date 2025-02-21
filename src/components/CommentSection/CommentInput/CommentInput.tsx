import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { styles } from './style';
import { useAuth } from '../../../hooks';
import { useState } from 'react';

interface CommentInputPropsType {
  submit: (content: string) => void;
  mode?: 'comment' | 'reply';
}

export default function CommentInput({ submit, mode }: CommentInputPropsType) {
  const { user } = useAuth();
  const [content, setContent] = useState<string>('');

  return (
    <Box sx={styles.container}>
      {user ? (
        <Box sx={styles.inputContainer}>
          <Avatar
            src={user?.photo_url}
            sx={mode === 'reply' ? { scale: 0.75 } : {}}
          />
          <Box sx={{ flex: 1 }}>
            <TextField
              variant="standard"
              autoComplete="off"
              fullWidth
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                onClick={() => {
                  setContent('');
                  submit(content);
                }}
                sx={{
                  mt: '5px',
                  py: '2px',
                  px: '10px',
                  fontWeight: 'bold',
                  borderRadius: '20px',
                  ':disabled': {
                    backgroundColor: '#272727',
                    color: 'gray',
                  },
                }}
                disabled={!content}
              >
                {mode === 'reply' ? 'Reply' : 'Comment'}
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography>Sign in to write comment</Typography>
      )}
    </Box>
  );
}
