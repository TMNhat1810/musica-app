import { Box } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import MediaControl from '../../../components/MediaControl';
import CommentContainer from '../../../components/CommentContainer';
import { MediaServices } from '../../../services';
import { useParams } from 'react-router-dom';
import { Media } from '../../../common/interfaces';
import { styles } from './style';
import MediaDescription from './MediaDescription';

export default function MediaView() {
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
        <Fragment>
          <MediaControl
            type={media.type}
            media_url={media.media_url}
            thumbnail_url={media.thumbnail_url}
          />
          <MediaDescription
            owner={media.user}
            title={media.title}
            description={media.description || ''}
          />
        </Fragment>
      )}

      <CommentContainer />
    </Box>
  );
}
