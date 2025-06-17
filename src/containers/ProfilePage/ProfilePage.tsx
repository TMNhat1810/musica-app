import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import { styles } from './style';
import { useParams, useSearchParams } from 'react-router-dom';
import { User } from '../../common/interfaces';
import { useEffect, useState } from 'react';
import { UserServices } from '../../services';
import { useAuth } from '../../hooks';
import EditAvatarControl from './EditAvatarControl';
import ProfileSettingMenu from './ProfileSettingMenu';
import MediaPannel from './MediaPannel';
import MediaTable from './MediaTable';
import ForumPostTable from './ForumPostTable';
import ForumPostPannel from './ForumPostPannel';
import StatsContainer from './StatsContainer';
import FollowButton from '../../components/FollowButton';
import { useTranslation } from 'react-i18next';

export default function ProfilePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();

  const [profile, setProfile] = useState<User | null>(null);
  const [tab, setTab] = useState<string>(searchParams.get('tab') || 'media');

  const { user } = useAuth();
  const { t } = useTranslation();
  const editable: boolean = user?.id === id;

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
    setSearchParams(
      (params) => {
        params.set('tab', newValue);
        return params;
      },
      { replace: true },
    );
  };

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
              <Typography variant="caption">
                {profile._count?.followers || 0} {t('followers')}
              </Typography>
              <Box mt={2}>
                {user && !editable && id && <FollowButton target_id={id} />}
              </Box>
            </Box>
          </Box>
          {editable && (
            <Box>
              <ProfileSettingMenu />
            </Box>
          )}
        </Box>
      )}
      <Container maxWidth="xl">
        <Tabs value={tab} onChange={handleChange}>
          <Tab value="media" label="Media" sx={styles.tabLabel} />
          <Tab value="post" label={t('posts')} sx={styles.tabLabel} />
          {editable && (
            <Tab value="stats" label={t('statistics')} sx={styles.tabLabel} />
          )}
        </Tabs>
        <Box sx={styles.tabContent}>
          {tab === 'media' && (editable ? <MediaTable /> : <MediaPannel />)}
          {tab === 'post' && (editable ? <ForumPostTable /> : <ForumPostPannel />)}
          {tab === 'stats' && editable && <StatsContainer />}
        </Box>
      </Container>
    </Box>
  );
}
