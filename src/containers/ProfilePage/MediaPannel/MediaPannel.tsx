import { Box, Container, Typography } from '@mui/material';
import { styles } from './style';
import { useEffect, useRef, useState } from 'react';
import { UserServices } from '../../../services';
import { useParams } from 'react-router-dom';
import { Media } from '../../../common/interfaces';
import MediaDisplay from '../../../components/MediaDisplay';

export default function MediaPannel() {
  const { id } = useParams();
  const [medias, setMedias] = useState<Media[]>([]);
  const [page, setPage] = useState<number>(1);
  const [theEnd, setTheEnd] = useState<boolean>(false);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!endRef.current || theEnd || !id) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !theEnd) {
        UserServices.getUserMedia(id, undefined, page)
          .then((data) => {
            setMedias((media) => [...media, ...data.medias]);
            if (page + 1 > data.totalPages) setTheEnd(true);
            else setPage((page) => page + 1);
          })
          .catch();
      }
    });

    observer.observe(endRef.current);

    return () => observer.disconnect();
  }, [id, page, theEnd]);

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xl">
        <Box sx={styles.mediaPannel}>
          {medias.map((media) => (
            <MediaDisplay key={media.id} media={media} />
          ))}
        </Box>
        {!theEnd && <Box ref={endRef} sx={{ height: '1px' }} />}
        <Box sx={{ display: theEnd ? 'block' : 'none', justifySelf: 'center' }}>
          <Typography>There's no more media on this channel! x_x</Typography>
        </Box>
      </Container>
    </Box>
  );
}
