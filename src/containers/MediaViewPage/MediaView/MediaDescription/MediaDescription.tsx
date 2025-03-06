import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { styles } from './style';
import { User } from '../../../../common/interfaces';
import { Link } from 'react-router-dom';

interface MediaDescriptionPropsType {
  owner: User;
  title: string;
  description: string;
}

export default function MediaDescription({
  owner,
  title,
  description,
}: MediaDescriptionPropsType) {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.titleContainer}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={styles.ownerInfoContainer}>
        <Link to={`/p/${owner.id}`}>
          <IconButton sx={{ p: 0 }}>
            <Avatar src={owner.photo_url} />
          </IconButton>
        </Link>
        <Box>
          <Link
            to={`/p/${owner.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {owner.display_name}
          </Link>
        </Box>
      </Box>
      <Box sx={styles.descriptionContainer}>{description}</Box>
    </Box>
  );
}
