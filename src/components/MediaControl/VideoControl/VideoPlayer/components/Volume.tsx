import { Box, Grow, IconButton, Slider, Tooltip } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

interface VolumePropsType {
  mediaRef: React.MutableRefObject<HTMLVideoElement | null>;
}

export default function Volume({ mediaRef }: VolumePropsType) {
  const [volume, setVolume] = useState<number>(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);

  const toggleMute = useCallback(() => {
    if (!mediaRef.current) return;
    if (muted && volume === 0) setVolume(0.5);
    mediaRef.current.muted = !muted;
    setMuted(!muted);
  }, [mediaRef, muted, volume]);

  const handleMouseEnter = () => setShowVolumeSlider(true);

  const handleMouseLeave = () => setShowVolumeSlider(false);

  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    const val = typeof newValue === 'number' ? newValue : newValue[0];
    setVolume(val / 100);
  };

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.volume = volume;
    }
    if (volume === 0) setMuted(true);
    else setMuted(false);
  }, [mediaRef, volume]);

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        display: 'flex',
        alignItems: 'center',
        ...(showVolumeSlider && {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: 5,
        }),
      }}
    >
      <Tooltip title={muted ? 'Unmute' : 'Mute'} placement="top" arrow>
        <IconButton
          sx={{
            '&:focus, &:active, &:hover': {
              outline: 'none',
              border: 'none',
            },
            position: 'relative',
            zIndex: 52,
          }}
          onClick={toggleMute}
        >
          {muted ? (
            <VolumeOffIcon />
          ) : volume < 0.66 ? (
            <VolumeDownIcon />
          ) : (
            <VolumeUpIcon />
          )}
        </IconButton>
      </Tooltip>
      <Grow in={showVolumeSlider} timeout={500} unmountOnExit mountOnEnter>
        <Box sx={{ width: 80, pr: 3 }}>
          <Slider
            value={muted ? 0 : volume * 100}
            onChange={handleVolumeChange}
            sx={{
              '& .MuiSlider-thumb': {
                width: 12,
                height: 12,
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: '0 0 0 8px rgba(255, 255, 255, 0.16)',
                },
              },
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-rail': {
                opacity: 0.28,
              },
            }}
          />
        </Box>
      </Grow>
    </Box>
  );
}
