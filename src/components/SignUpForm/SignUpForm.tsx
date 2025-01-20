import { Box, Button, TextField, Typography } from '@mui/material';
import { styles } from './style';
import { Link } from 'react-router-dom';

export default function SignUpForm() {
  return (
    <Box sx={styles.container}>
      <Typography
        variant="h4"
        sx={{ textAlign: 'center' }}
        borderBottom="2px solid white"
        marginBottom="5px"
      >
        MUSICA
      </Typography>
      <TextField
        label="username"
        variant="outlined"
        slotProps={{ inputLabel: { sx: { color: 'white' } } }}
        sx={{
          color: 'white',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
          },
        }}
      />
      <TextField
        label="password"
        variant="outlined"
        type="password"
        slotProps={{ inputLabel: { sx: { color: 'white' } } }}
        sx={{
          color: 'white',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
          },
        }}
      />
      <Box sx={styles.buttonContainer}>
        <Button variant="contained" sx={styles.button}>
          Sign In
        </Button>
      </Box>
      <Typography sx={styles.bottomText}>
        Already had account? <Link to="/auth/sign-in">Sign in</Link>{' '}
      </Typography>
    </Box>
  );
}
