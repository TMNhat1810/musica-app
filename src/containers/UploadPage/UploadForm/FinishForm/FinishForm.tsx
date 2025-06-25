import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { styles } from './style';
import { useNavigate } from 'react-router-dom';
import { DropzoneArea } from 'mui-file-dropzone';
import {
  AudioMimetypes,
  ImageMimetypes,
  VideoMimetypes,
} from '../../../../common/mimetypes';
import { useRef, useState } from 'react';
import { MediaServices } from '../../../../services';
import { useAuth } from '../../../../hooks';
import { useTranslation } from 'react-i18next';

interface FinishFormPropsType {
  title: string;
  description: string;
  media: File | null;
  thumbnail: File | null;
  callback: (thumbnail: File | null) => void;
}

export default function FinishForm({
  title,
  description,
  media,
  thumbnail,
  callback,
}: FinishFormPropsType) {
  const [uploading, setUploading] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLMediaElement | null>(null);
  const { user } = useAuth();
  const { t } = useTranslation();

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!media || !ref.current?.duration) return;
      await MediaServices.uploadMedia(
        title,
        description,
        media,
        ref.current.duration,
        thumbnail,
      );
      navigate(`/p/${user?.id}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.previewContainer}>
        {media && AudioMimetypes.includes(media.type) && (
          <audio
            ref={ref as React.RefObject<HTMLAudioElement>}
            src={URL.createObjectURL(media)}
            preload="metadata"
            onLoadedMetadata={() => setReady(true)}
            hidden
          />
        )}
        {media && VideoMimetypes.includes(media.type) && (
          <video
            ref={ref as React.RefObject<HTMLVideoElement>}
            src={URL.createObjectURL(media)}
            preload="metadata"
            onLoadedMetadata={() => setReady(true)}
            hidden
          />
        )}
        <Box>
          {!thumbnail && (
            <DropzoneArea
              showPreviewsInDropzone={false}
              fileObjects={[]}
              onChange={(files) => {
                if (files.length > 0) callback(files[0]);
              }}
              maxFileSize={10 * 1024 * 1024}
              acceptedFiles={ImageMimetypes}
              filesLimit={1}
              dropzoneClass="mui-dropzone-container"
              dropzoneText={t('txt-upload-thumbnail')}
              clearOnUnmount={false}
              dropzoneProps={{ disabled: !!thumbnail }}
            />
          )}
          {thumbnail && (
            <Box>
              <img
                src={URL.createObjectURL(thumbnail)}
                style={{ width: '320px', height: '280px' }}
              />
            </Box>
          )}
        </Box>
        <Box>
          <Typography>{title}</Typography>
        </Box>
      </Box>
      <Box sx={styles.buttonContainer}>
        <Button
          onClick={() => navigate('/')}
          disabled={uploading}
          sx={{
            color: 'text.primary',
          }}
        >
          {t('cancel')}
        </Button>
        {!uploading && (
          <Button
            onClick={handleUpload}
            disabled={uploading || !ready}
            sx={{
              '&.Mui-disabled': {
                color: 'text.disabled',
              },
            }}
          >
            {t('upload')}
          </Button>
        )}
        {uploading && <CircularProgress size="30px" />}
      </Box>
    </Box>
  );
}
