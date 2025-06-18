import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import UserPanel from './components/UserPanel';
import MediaPanel from './components/MediaPanel';
import PendingMediaPanel from './components/PendingMediaPanel';
import Dashboard from './components/Dashboard';
import { styles } from './style';
import { useTranslation } from 'react-i18next';

export default function AdminPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState<string>(searchParams.get('tab') || 'dashboard');

  const { t } = useTranslation();

  return (
    <Box sx={styles.container}>
      <Tabs
        orientation="vertical"
        value={tab}
        onChange={(_, newValue) => {
          setTab(newValue);
          setSearchParams(
            (params) => {
              params.set('tab', newValue);
              return params;
            },
            { replace: true },
          );
        }}
      >
        <Tab value="dashboard" label="Dashboard" sx={styles.tabLabel} />
        <Tab value="user" label={t('user')} sx={styles.tabLabel} />
        <Tab value="media" label="Media" sx={styles.tabLabel} />
        <Tab value="pending" label={t('pending')} sx={styles.tabLabel} />
      </Tabs>
      <Box sx={styles.dataContainer}>
        {tab === 'dashboard' && <Dashboard />}
        {tab === 'user' && <UserPanel />}
        {tab === 'media' && <MediaPanel />}
        {tab === 'pending' && <PendingMediaPanel />}
      </Box>
    </Box>
  );
}
