import { Box, Button } from '@mui/material';
import { styles } from './style';
import { useNavigate } from 'react-router-dom';

export default function FinishForm() {
  const navigate = useNavigate();

  return (
    <Box sx={styles.container}>
      <Box sx={styles.buttonContainer}>
        <Button
          onClick={() => navigate('/')}
          sx={{
            color: 'text.primary',
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {}}
          sx={{
            '&.Mui-disabled': {
              color: 'text.disabled',
            },
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
