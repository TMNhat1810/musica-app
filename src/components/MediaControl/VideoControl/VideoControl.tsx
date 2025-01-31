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
      <video width="640" height="360" controls>
        <source src={video_url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
}
