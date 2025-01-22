import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { styles } from './style';
import { useNavigate } from 'react-router-dom';
import { DropzoneArea } from 'mui-file-dropzone';
import { ImageMimetypes } from '../../../../common/mimetypes';
import { useState } from 'react';
import { MediaServices } from '../../../../services';

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
  const navigate = useNavigate();

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!media) return;
      await MediaServices.uploadMedia(title, description, media, thumbnail);
      navigate('/');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.previewContainer}>
        <Box>
          {!thumbnail && (
            <DropzoneArea
              showPreviewsInDropzone={false}
              fileObjects={[]}
              onChange={(files) => {
                if (files.length > 0) callback(files[0]);
              }}
              maxFileSize={5 * 1024 * 1024}
              acceptedFiles={ImageMimetypes}
              filesLimit={1}
              dropzoneClass="mui-dropzone-container"
              dropzoneText="Upload thumbnail image (optional)"
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
          Cancel
        </Button>
        {!uploading && (
          <Button
            onClick={handleUpload}
            disabled={uploading}
            sx={{
              '&.Mui-disabled': {
                color: 'text.disabled',
              },
            }}
          >
            Upload
          </Button>
        )}
        {uploading && <CircularProgress size="30px" />}
      </Box>
    </Box>
  );
}
