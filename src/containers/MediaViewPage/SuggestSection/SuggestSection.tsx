import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Media } from '../../../common/interfaces';
import { useEffect, useState } from 'react';
import { styles } from './style';
import { MediaServices } from '../../../services';
import MediaDisplay from '../../../components/MediaDisplay';

export default function SuggestSection() {
  const { id } = useParams<{ id: string }>();
  const [medias, setMedias] = useState<Media[]>([]);

  useEffect(() => {
    if (!id) return;
    MediaServices.getSuggestMedia(id)
      .then((data) => setMedias(data.medias))
      .catch();
  }, [id]);

  return (
    <Box sx={styles.container}>
      {medias.map((media) => (
        <MediaDisplay key={media.id} media={media} horizontal />
      ))}
    </Box>
  );
}
