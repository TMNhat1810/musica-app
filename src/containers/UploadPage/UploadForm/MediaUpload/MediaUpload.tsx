import { Box, Button, Chip, Divider, IconButton, Typography } from '@mui/material';
import { styles } from './style';
import { DropzoneArea } from 'mui-file-dropzone';
import DeleteIcon from '@mui/icons-material/Delete';
import { VideoMimetypes } from '../../../../common/mimetypes';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface MediaUploadPropsType {
  media: File | null;
  callback: (file: File | null) => void;
  setStep: (step: number) => void;
}

export default function MediaUpload({
  media,
  callback,
  setStep,
}: MediaUploadPropsType) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box sx={styles.container}>
      {!media && (
        <DropzoneArea
          showPreviewsInDropzone={false}
          fileObjects={[]}
          onChange={(files) => {
            if (files.length > 0) callback(files[0]);
          }}
          maxFileSize={1024 * 1024 * 1024}
          acceptedFiles={VideoMimetypes}
          filesLimit={1}
          dropzoneClass="mui-dropzone-container"
          dropzoneText={t('txt-upload-here-message')}
          clearOnUnmount={false}
          dropzoneProps={{ disabled: !!media }}
          getFileLimitExceedMessage={() => t('txt-file-limit-exceed-message')}
          getDropRejectMessage={(rejectedFile) => {
            if (rejectedFile.size > 1024 * 1024 * 1024) {
              return rejectedFile.name + ': ' + t('txt-file-exceed-limit-message');
            }
            return (
              rejectedFile.name + ': ' + t('txt-file-type-not-supported-message')
            );
          }}
        />
      )}
      {media && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Chip label={media.name} sx={{ border: '1px solid lightgray' }} />
            <IconButton
              onClick={() => callback(null)}
              sx={{
                height: '40px',
                width: '40px',
                border: '2px solid red',
                padding: '4px',
                borderRadius: '50%',
              }}
            >
              <DeleteIcon
                sx={{
                  height: '40px',
                  width: '40px',
                  border: '2px solid red',
                  padding: '4px',
                  borderRadius: '50%',
                }}
                color="error"
              />
            </IconButton>
          </Box>
          <Divider
            flexItem
            orientation="vertical"
            sx={{ backgroundColor: 'text.primary' }}
          />
          <Box>
            <Typography>File name: {media.name}</Typography>
            <Typography>Size: {media.size}</Typography>
            <Typography>Type: {media.type}</Typography>
          </Box>
        </Box>
      )}
      <Box sx={styles.buttonContainer}>
        <Button
          onClick={() => navigate('/')}
          sx={{
            color: 'text.primary',
          }}
        >
          {t('cancel')}
        </Button>
        <Button
          onClick={() => setStep(1)}
          disabled={!media}
          sx={{
            '&.Mui-disabled': {
              color: 'text.disabled',
            },
          }}
        >
          {t('next')}
        </Button>
      </Box>
    </Box>
  );
}
