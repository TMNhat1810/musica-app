import { Box } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LogServices } from '../../../services';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks';

interface VideoControlPropsType {
  video_url: string;
  thumbnail_url?: string;
}

export default function VideoControl({
  video_url,
  thumbnail_url,
}: VideoControlPropsType) {
  const mediaRef = useRef<HTMLVideoElement | null>(null);
  const playtimeRef = useRef<number>(0);
  const [logged, setLogged] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);

  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const handleLoaded = () => {
    if (!mediaRef.current) return;
    mediaRef.current.play().catch();
  };

  const handleLogUserView = useCallback(() => {
    if (logged || !id) return;

    LogServices.logViewMedia(id)
      .then(() => setLogged(true))
      .catch();
  }, [id, logged]);

  useEffect(() => {
    if (!mediaRef.current || !playing || !isAuthenticated) return;
    if (logged) return;

    const interval = setInterval(() => {
      playtimeRef.current += 1;
      if (playtimeRef.current >= 10) {
        handleLogUserView();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [playing, logged, handleLogUserView, isAuthenticated]);

  return (
    <Box>
      {thumbnail_url && <></>}
      <video
        controls
        onLoadedData={handleLoaded}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={handleLogUserView}
        ref={mediaRef}
        style={{
          width: '100%',
          accentColor: 'cyan',
        }}
      >
        <source src={video_url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
}
