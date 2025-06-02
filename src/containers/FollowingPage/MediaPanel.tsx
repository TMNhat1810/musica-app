import { Box, Container, Typography } from '@mui/material';
import { styles } from './style';
import { useEffect, useRef, useState } from 'react';
import { Media } from '../../common/interfaces';
import { UserServices } from '../../services';
import MediaDisplay from '../../components/MediaDisplay';

interface MediaPanelPropsType {
  selectedUserId: string | null;
}

export default function MediaPanel({ selectedUserId }: MediaPanelPropsType) {
  const [medias, setMedias] = useState<Media[]>([]);
  const [page, setPage] = useState<number>(1);
  const [theEnd, setTheEnd] = useState<boolean>(false);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMedias([]);
    setPage(1);
    setTheEnd(false);
  }, [selectedUserId]);

  useEffect(() => {
    if (!endRef.current || theEnd) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !theEnd) {
        if (!selectedUserId)
          UserServices.getCurrentUserFolloweesMedias(page)
            .then((data) => {
              setMedias((media) => [...media, ...data.medias]);
              if (page + 1 > data.totalPages) setTheEnd(true);
              else setPage((page) => page + 1);
            })
            .catch();
        else
          UserServices.getUserMedia(selectedUserId, undefined, page)
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
  }, [page, selectedUserId, theEnd]);

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
