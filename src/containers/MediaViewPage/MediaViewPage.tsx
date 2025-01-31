import { Box } from '@mui/material';
import { styles } from './style';
import { useParams } from 'react-router-dom';
import MediaControl from '../../components/MediaControl';
import { useEffect, useState } from 'react';
import { Media } from '../../common/interfaces';
import { MediaServices } from '../../services';

export default function MediaViewPage() {
  const { id } = useParams<{ id: string }>();
  const [media, setMedia] = useState<Media | null>(null);

  useEffect(() => {
    if (!id) return;
    MediaServices.getMediaById(id)
      .then((data) => setMedia(data))
      .catch();
  }, [id]);

  return (
    <Box sx={styles.container}>
      {media && (
        <MediaControl
          type={media.type}
          media_url={media.media_url}
          thumbnail_url={media.thumbnail_url}
        />
      )}
    </Box>
  );
}
