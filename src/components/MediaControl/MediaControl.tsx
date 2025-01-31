import VideoControl from './VideoControl';
import AudioControl from './AudioControl';

interface MediaControlPropsType {
  type: 'video' | 'audio';
  media_url: string;
  thumbnail_url?: string;
}

export default function MediaControl({
  type,
  media_url,
  thumbnail_url,
}: MediaControlPropsType) {
  return type === 'video' ? (
    <VideoControl video_url={media_url} thumbnail_url={thumbnail_url} />
  ) : (
    <AudioControl audio_url={media_url} thumbnail_url={thumbnail_url} />
  );
}
