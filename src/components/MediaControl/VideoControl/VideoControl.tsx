import { Box } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';

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

  const handleLoaded = () => {
    if (!mediaRef.current) return;

    mediaRef.current.muted = true;
    mediaRef.current.play().catch();
  };

  const handleLogUserView = useCallback(() => {
    if (logged) return;
    setLogged(true);
  }, [logged]);

  useEffect(() => {
    if (!mediaRef.current || !playing) return;
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
  }, [playing, logged, handleLogUserView]);

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
