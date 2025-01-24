import { Box } from '@mui/material';
import { styles } from './style';
import { useEffect, useState } from 'react';
import { Media } from '../../common/interfaces';
import MediaDisplay from '../../components/MediaDisplay';
import { MediaServices } from '../../services';

export default function HomePage() {
  const [medias, setMedias] = useState<Media[]>([]);

  useEffect(() => {
    MediaServices.getMedias()
      .then((data) => setMedias(data.medias))
      .catch();
  }, []);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.mediaPannel}>
        {medias.map((media) => (
          <MediaDisplay key={media.id} media={media} />
        ))}
      </Box>
    </Box>
  );
}
