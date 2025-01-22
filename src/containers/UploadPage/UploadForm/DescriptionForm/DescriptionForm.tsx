import { Box } from '@mui/material';
import { styles } from './style';

interface DescriptionFormPropsType {
  title: string;
  description: string;
  titleCallback: (title: string) => void;
  descriptionCallback: (description: string) => void;
}

export default function DescriptionForm({
  title,
  description,
  titleCallback,
  descriptionCallback,
}: DescriptionFormPropsType) {
  return <Box sx={styles.container}></Box>;
}
