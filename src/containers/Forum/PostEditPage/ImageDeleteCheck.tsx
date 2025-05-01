import { useEffect, useState } from 'react';
import { Box, Checkbox } from '@mui/material';
import { ForumImage } from '../../../common/interfaces';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface ImageDeleteCheckPropsType {
  image: ForumImage;
  callback: (id: string, del: boolean) => void;
}

export default function ImageDeleteCheck({
  image,
  callback,
}: ImageDeleteCheckPropsType) {
  const [del, setDel] = useState<boolean>(false);

  useEffect(() => {
    callback(image.id, del);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [del]);

  return (
    <Box position="relative">
      <img
        src={image.url}
        alt={`preview ${image.id}`}
        width={100}
        height={100}
        style={{ objectFit: 'cover', borderRadius: 8 }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'background.paper',
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
        <DeleteOutlineIcon />
        <Checkbox
          checked={del}
          onChange={(event) => {
            setDel(event.target.checked);
          }}
          sx={{
            color: 'text.primary',
            width: 20,
            height: 20,
            '&.Mui-checked': {
              color: 'red',
            },
          }}
        />
      </Box>
    </Box>
  );
}
