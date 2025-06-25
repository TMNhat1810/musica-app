import { Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { styles } from './style';
import { MouseEvent, useRef, useState } from 'react';
import PreviewModal from './PreviewModal';
import { useTranslation } from 'react-i18next';

interface EditAvatarControlPropsType {
  src: string;
  editable: boolean;
}

export default function EditAvatarControl({
  src,
  editable,
}: EditAvatarControlPropsType) {
  const [previewAvatar, setPreviewAvatar] = useState<File | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const open = Boolean(anchorEl);

  const { t } = useTranslation();

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditingAvatar = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewAvatar(file);
    }
  };

  return (
    <Box sx={styles.container}>
      <IconButton onClick={handleOpenMenu} disabled={!editable}>
        <Avatar src={src} sx={{ width: '100px', height: '100px' }} />
      </IconButton>
      {editable && (
        <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <MenuItem onClick={handleEditingAvatar}>
            {t('txt-edit-avatar')}
            <input
              type="file"
              hidden
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
            />
          </MenuItem>
        </Menu>
      )}
      {previewAvatar && (
        <PreviewModal
          data={previewAvatar}
          onClose={() => {
            setPreviewAvatar(null);
            handleCloseMenu();
          }}
        />
      )}
    </Box>
  );
}
