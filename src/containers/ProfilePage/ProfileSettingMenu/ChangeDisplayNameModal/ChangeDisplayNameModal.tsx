import { Box, Modal } from '@mui/material';
import { styles } from './style';

interface ChangeDisplayNameModalPropsType {
  open: boolean;
  onClose: () => void;
}

export default function ChangeDisplayNameModal({
  open,
  onClose,
}: ChangeDisplayNameModalPropsType) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.contentContainer}></Box>
    </Modal>
  );
}
