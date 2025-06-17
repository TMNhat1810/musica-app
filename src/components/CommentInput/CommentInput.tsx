import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { styles } from './style';
import { useAuth } from '../../hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CommentInputPropsType {
  submit: (content: string) => void;
  mode?: 'comment' | 'reply';
}

export default function CommentInput({ submit, mode }: CommentInputPropsType) {
  const { user } = useAuth();
  const [content, setContent] = useState<string>('');

  const { t } = useTranslation();

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
              placeholder={t('write-something-message')}
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
                {mode === 'reply' ? t('replies') : t('comment')}
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography>{t('txt-login-to-comment')}</Typography>
      )}
    </Box>
  );
}
