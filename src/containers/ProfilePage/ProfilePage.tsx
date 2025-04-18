import { Box, Typography } from '@mui/material';
import { styles } from './style';
import { useParams } from 'react-router-dom';
import { User } from '../../common/interfaces';
import { useEffect, useState } from 'react';
import { UserServices } from '../../services';
import { useAuth } from '../../hooks';
import EditAvatarControl from './EditAvatarControl';
import ProfileSettingMenu from './ProfileSettingMenu';

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<User | null>(null);

  const { user } = useAuth();
  const editable: boolean = user?.id === id;

  useEffect(() => {
    if (!id) return;
    UserServices.getUserById(id)
      .then((data) => setProfile(data))
      .catch();
  }, [id]);

  return (
    <Box sx={styles.container}>
      {profile && (
        <Box sx={styles.headerContainer}>
          <Box sx={styles.profileContainer}>
            <EditAvatarControl src={profile.photo_url} editable={editable} />
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {profile.display_name}
                </Typography>
                <Typography variant="body2">@{profile.username}</Typography>
              </Box>
              <Typography variant="body1">{profile.email}</Typography>
            </Box>
          </Box>
          {editable && (
            <Box>
              <ProfileSettingMenu />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
