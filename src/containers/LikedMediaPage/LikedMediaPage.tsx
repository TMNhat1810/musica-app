import { Box, Container, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Media } from '../../common/interfaces';
import { UserServices } from '../../services';
import MediaDisplay from '../../components/MediaDisplay';
import { styles } from './style';

export default function LikedMediaPage() {
  const [medias, setMedias] = useState<Media[]>([]);
  const [page, setPage] = useState<number>(1);
  const [theEnd, setTheEnd] = useState<boolean>(false);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!endRef.current || theEnd) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !theEnd) {
        UserServices.getUserLikedMedias(page)
          .then((data) => {
            setMedias((media) => [
              ...media,
              ...data.logs.map((log: { media: Media }) => log.media),
            ]);
            if (page + 1 > data.totalPages) setTheEnd(true);
            else setPage((page) => page + 1);
          })
          .catch();
      }
    });

    observer.observe(endRef.current);

    return () => observer.disconnect();
  }, [page, theEnd]);
  return (
    <Box sx={styles.container}>
      <Container maxWidth="xl">
        <Typography variant="h5">Your liked media</Typography>
        <Box sx={styles.mediaPannel}>
          {medias.map((media) => (
            <MediaDisplay key={media.id} media={media} />
          ))}
        </Box>
        {!theEnd && <Box ref={endRef} sx={{ height: '1px' }} />}
      </Container>
    </Box>
  );
}
