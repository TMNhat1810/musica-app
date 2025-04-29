import { Box } from '@mui/material';

interface VideoControlPropsType {
  video_url: string;
  thumbnail_url?: string;
}

export default function VideoControl({
  video_url,
  thumbnail_url,
}: VideoControlPropsType) {
  return (
    <Box>
      {thumbnail_url && <></>}
      <video
        controls
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
