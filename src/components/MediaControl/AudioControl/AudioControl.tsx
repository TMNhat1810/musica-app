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
      {thumbnail_url && <></>}
      <audio controls>
        <source src={audio_url} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </Box>
  );
}
