import { Box, Button } from '@mui/material';
import { styles } from './style';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export default function Forum() {
  const navigate = useNavigate();
  return (
    <Box sx={styles.container}>
      <Button
        variant="outlined"
        sx={{}}
        onClick={() => {
          navigate('new');
        }}
      >
        <AddIcon />
        Add Post
      </Button>
    </Box>
  );
}
