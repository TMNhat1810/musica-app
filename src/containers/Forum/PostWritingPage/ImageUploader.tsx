import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export interface MultipleImageUploaderRef {
  images: File[];
}

function ImageUploader(_: unknown, ref: React.Ref<MultipleImageUploaderRef>) {
  const [images, setImages] = useState<File[]>([]);

  useImperativeHandle(ref, () => ({
    images,
  }));

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList = Array.from(event.target.files);
      setImages([...images, ...fileList]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Button
        variant="text"
        component="label"
        sx={{
          textTransform: 'none',
          color: 'text.primary',
          padding: 0,
          ':hover': { opacity: 0.8 },
        }}
      >
        <Typography>
          <AttachFileIcon sx={{ fontSize: '16px' }} />
          Attachments
        </Typography>
        <input
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </Button>
      <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
        {images.map((file, index) => {
          const imageUrl = URL.createObjectURL(file);
          return (
            <Box key={index} position="relative">
              <img
                src={imageUrl}
                alt={`preview ${index}`}
                width={100}
                height={100}
                style={{ objectFit: 'cover', borderRadius: 8 }}
              />
              <Button
                size="small"
                onClick={() => removeImage(index)}
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  borderRadius: '50%',
                  minWidth: 24,
                  height: 24,
                }}
              >
                ✕
              </Button>
            </Box>
          );
        })}
      </Box>
      {images.length > 0 && (
        <Typography variant="caption" mt={1}>
          {images.length} images selected
        </Typography>
      )}
    </Box>
  );
}

export default forwardRef(ImageUploader);
