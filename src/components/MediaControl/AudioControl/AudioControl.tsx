import { Box } from '@mui/material';

interface AudioControlPropsType {
  audio_url: string;
  thumbnail_url?: string;
}

export default function AudioControl({
  audio_url,
  thumbnail_url,
}: AudioControlPropsType) {
  return (
    <Box>
      {thumbnail_url && (
        <img
          src={thumbnail_url}
          alt={thumbnail_url}
          style={{ width: '100%', maxHeight: '360px', objectFit: 'contain' }}
        />
      )}
      <audio controls style={{ width: '100%' }}>
        <source src={audio_url} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </Box>
  );
}
