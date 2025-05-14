import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Box, IconButton, Slider, Tooltip, Typography } from '@mui/material';
import { styles } from './style';
import { formatDuration } from '../../../../utils/datetime';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import PictureInPictureAltIcon from '@mui/icons-material/PictureInPictureAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export type VideoPlayerRef = {
  play: () => void;
  pause: () => void;
  toggleFullscreen: () => void;
  togglePip: () => void;
  toggleMute: () => void;
  togglePlay: () => void;
  playing: boolean;
};

interface VideoPlayerPropsType {
  src: string;
  poster: string;
  autoplay?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
}

function VideoPlayer(
  { src, poster, autoplay = false, onPlay, onPause }: VideoPlayerPropsType,
  ref: React.Ref<VideoPlayerRef>,
) {
  const mediaRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);

  const [started, setStarted] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [PiP, setPiP] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);

  const togglePlay = useCallback(() => {
    if (!mediaRef.current) return;
    if (mediaRef.current.paused) {
      mediaRef.current.play();
      setPlaying(true);
    } else {
      mediaRef.current.pause();
      setPlaying(false);
    }
  }, [mediaRef]);

  const handleStart = useCallback(() => {
    if (!mediaRef.current) return;
    mediaRef.current
      .play()
      .then(() => {
        setStarted(true);
        setPlaying(true);
      })
      .catch();
  }, []);

  const handleTimeUpdate = () => {
    const video = mediaRef.current;
    if (!video || !video.duration) return;

    const percent = (video.currentTime / video.duration) * 100;
    setProgress(percent);
  };

  const toggleFullscreen = useCallback(() => {
    const video = containerRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => setFullscreen(false));
    } else {
      video.requestFullscreen?.().then(() => setFullscreen(true));
    }
  }, []);

  const togglePiP = useCallback(() => {
    const video = mediaRef.current;
    if (!video) return;

    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().then(() => setPiP(false));
    } else {
      video.requestPictureInPicture?.().then(() => setPiP(true));
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!mediaRef.current) return;
    mediaRef.current.muted = !muted;
    setMuted(!muted);
  }, [mediaRef, muted]);

  const handleSeek = useCallback(
    (_: Event, newValue: number | number[]) => {
      if (!mediaRef.current) return;
      const val = typeof newValue === 'number' ? newValue : newValue[0];
      mediaRef.current.currentTime = (val / 100) * mediaRef.current.duration;
      setProgress(val);
    },
    [mediaRef],
  );

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimeoutRef.current !== null) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = window.setTimeout(() => {
      setShowControls(false);
    }, 2000);
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      mediaRef.current?.play().then(() => setPlaying(true));
    },
    pause: () => {
      mediaRef.current?.pause();
      setPlaying(false);
    },
    toggleFullscreen: toggleFullscreen,
    togglePip: () => {},
    toggleMute: toggleMute,
    togglePlay: togglePlay,
    playing: playing,
  }));

  useEffect(() => {
    if (autoplay) handleStart();
  }, [autoplay, handleStart]);

  useEffect(() => {
    if (playing && onPlay) onPlay();
    if (!playing && onPause) onPause();
  }, [onPause, onPlay, playing]);

  const handleMouseMove = useCallback(() => {
    resetHideTimer();
  }, [resetHideTimer]);

  useEffect(() => {
    if (!fullscreen) return;

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove);

    resetHideTimer();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [fullscreen, handleMouseMove, resetHideTimer]);

  return (
    <Box sx={styles.container} ref={containerRef}>
      <video
        ref={mediaRef}
        src={src}
        poster={poster}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 10,
        }}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
      />
      {!started && (
        <Box sx={styles.cover}>
          <IconButton
            sx={{ ...styles.button, width: '100%', height: '100%', borderRadius: 0 }}
            onClick={handleStart}
          >
            <Box
              sx={{
                borderRadius: '50%',
                border: '5px solid',
                color: 'primary.main',
                backgroundColor: 'rgba(0,0,0,0.6)',
              }}
            >
              <PlayArrowIcon sx={{ fontSize: 128 }} />
            </Box>
          </IconButton>
        </Box>
      )}
      {started && (!fullscreen || showControls) && (
        <Box sx={styles.controlContainer}>
          <Box sx={styles.progressBarContainer}>
            <Slider
              value={progress}
              onChange={handleSeek}
              sx={{
                flexGrow: 1,
                height: 5,
                '& .MuiSlider-thumb': {
                  width: 16,
                  height: 16,
                  border: '2px solid',
                },
              }}
              valueLabelDisplay="auto"
            />
          </Box>
          <Box sx={styles.controlActionContainer}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title={playing ? 'Pause' : 'Play'} placement="top" arrow>
                <IconButton sx={{ ...styles.button }} onClick={togglePlay}>
                  {playing ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title={muted ? 'Unmute' : 'Mute'} placement="top" arrow>
                <IconButton sx={{ ...styles.button }} onClick={toggleMute}>
                  {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                </IconButton>
              </Tooltip>
              <Typography variant="caption" sx={{ pt: 0.25 }}>
                {formatDuration(
                  Math.round((progress / 100) * (mediaRef.current?.duration || 0)),
                )}
                {' / '}
                {formatDuration(Math.round(mediaRef.current?.duration || 0))}
              </Typography>
            </Box>
            <Box>
              <Tooltip
                title={PiP ? 'Exit Picture-in-Picture' : 'Enter Picture-in-Picture'}
                placement="top"
                arrow
              >
                <IconButton sx={{ ...styles.button }} onClick={togglePiP}>
                  {PiP ? <ExitToAppIcon /> : <PictureInPictureAltIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip
                title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                placement="top"
                arrow
              >
                <IconButton sx={{ ...styles.button }} onClick={toggleFullscreen}>
                  {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default forwardRef<VideoPlayerRef, VideoPlayerPropsType>(VideoPlayer);
