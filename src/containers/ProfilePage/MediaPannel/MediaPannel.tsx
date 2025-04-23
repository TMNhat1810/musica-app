import { Box, Container, Typography } from '@mui/material';
import { styles } from './style';
import { useEffect, useState } from 'react';
import { UserServices } from '../../../services';
import { useParams } from 'react-router-dom';
import { Media } from '../../../common/interfaces';
import MediaDisplay from '../../../components/MediaDisplay';

export default function MediaPannel() {
  const { id } = useParams();
  const [medias, setMedias] = useState<Media[]>([]);

  useEffect(() => {
    if (id)
      UserServices.getUserMedia(id)
        .then((data) => setMedias(data.medias))
        .catch();
  }, [id]);

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xl">
        <Typography>Media</Typography>
        <Box sx={styles.mediaPannel}>
          {medias.map((media) => (
            <MediaDisplay key={media.id} media={media} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
