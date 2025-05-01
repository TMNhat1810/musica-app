import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { ForumImage } from '../../../common/interfaces';
import AddIcon from '@mui/icons-material/Add';
import ImageDeleteCheck from './ImageDeleteCheck';

export interface MultipleImageUploaderRef {
  deleteIds: string[];
  images: File[];
}

interface ImageUploaderPropsType {
  orgImages?: ForumImage[];
}

function ImageUploader(
  { orgImages }: ImageUploaderPropsType,
  ref: React.Ref<MultipleImageUploaderRef>,
) {
  const [images, setImages] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const deleteIdsRef = useRef<string[]>([]);

  useImperativeHandle(ref, () => ({
    images,
    deleteIds: deleteIdsRef.current,
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

  const handleDeleteOrgImage = (id: string, del: boolean) => {
    if (del) {
      if (!deleteIdsRef.current.includes(id)) {
        deleteIdsRef.current.push(id);
      }
    } else {
      const index = deleteIdsRef.current.indexOf(id);
      if (index !== -1) {
        deleteIdsRef.current.splice(index, 1);
      }
    }
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
          Attach
        </Typography>
        <input
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
      </Button>
      <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
        {orgImages &&
          orgImages.map((image, index) => (
            <ImageDeleteCheck
              key={index}
              image={image}
              callback={handleDeleteOrgImage}
            />
          ))}
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
        <Button
          sx={{
            width: 100,
            height: 100,
            borderWidth: 2,
            borderStyle: 'dashed',
            borderColor: 'text.primary',
          }}
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          <AddIcon sx={{ width: 50, height: 50, color: 'text.primary' }} />
        </Button>
      </Box>
      {images.length > 0 && (
        <Typography variant="caption" mt={1}>
          {images.length} images selected
        </Typography>
      )}
    </Box>
  );
}

export default forwardRef<MultipleImageUploaderRef, ImageUploaderPropsType>(
  ImageUploader,
);
