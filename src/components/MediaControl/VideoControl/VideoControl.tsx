import { Box } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LogServices } from '../../../services';
import { useParams } from 'react-router-dom';
import { useAuth, useOnPageLeave } from '../../../hooks';
import { styles } from './style';
import VideoPlayer, { VideoPlayerRef } from './VideoPlayer';
import { DEFAULT_THUMBNAIL_URL } from '../../../constants';

interface VideoControlPropsType {
  video_url: string;
  thumbnail_url?: string;
}

export default function VideoControl({
  video_url,
  thumbnail_url,
}: VideoControlPropsType) {
  const mediaRef = useRef<VideoPlayerRef | null>(null);
  const playtimeRef = useRef<number>(0);
  const [logged, setLogged] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);

  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const handleLogUserView = useCallback(() => {
    if (logged || !id) return;

    LogServices.logViewMedia(id)
      .then(() => setLogged(true))
      .catch();
  }, [id, logged]);

  const handlePlay = useCallback(() => {
    if (!logged) setPlaying(true);
  }, [logged]);

  const handlePause = useCallback(() => {
    if (!logged) setPlaying(false);
  }, [logged]);

  useEffect(() => {
    if (!playing || !isAuthenticated) return;

    const interval = setInterval(() => {
      playtimeRef.current += 1;
      if (!logged)
        if (playtimeRef.current >= 10) {
          handleLogUserView();
        }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [logged, handleLogUserView, isAuthenticated, playing]);

  useEffect(() => {
    return () => {
      if (id && playtimeRef.current >= 10)
        LogServices.logMediaViewDetail(id, playtimeRef.current);
    };
  }, [id]);

  useOnPageLeave(() => {
    if (id && playtimeRef.current >= 10)
      LogServices.logMediaViewDetail(id, playtimeRef.current);
  });

  return (
    <Box sx={styles.container}>
      <VideoPlayer
        ref={mediaRef}
        src={video_url}
        poster={thumbnail_url || DEFAULT_THUMBNAIL_URL}
        autoplay
        onPlay={handlePlay}
        onPause={handlePause}
      />
    </Box>
  );
}
