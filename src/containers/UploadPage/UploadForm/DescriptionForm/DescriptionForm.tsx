import { Box, Button, TextField } from '@mui/material';
import { styles } from './style';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface DescriptionFormPropsType {
  titleCallback: (title: string) => void;
  descriptionCallback: (description: string) => void;
  setStep: (step: number) => void;
}

export default function DescriptionForm({
  titleCallback,
  descriptionCallback,
  setStep,
}: DescriptionFormPropsType) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const navigate = useNavigate();

  const handleNextStep = () => {
    titleCallback(title);
    descriptionCallback(description);
    setStep(2);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.formContainer}>
        <TextField
          label="Title"
          variant="outlined"
          autoComplete="off"
          slotProps={{ inputLabel: { sx: { color: 'gray' } } }}
          sx={{
            color: 'white',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'lightgray',
              },
            },
          }}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          autoComplete="off"
          multiline
          minRows={6}
          slotProps={{ inputLabel: { sx: { color: 'gray' } } }}
          sx={{
            color: 'white',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'lightgray',
              },
            },
          }}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Box>
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
          onClick={handleNextStep}
          disabled={!title.trim()}
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
