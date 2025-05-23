import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import ChartsContainer from './ChartsContainer';
import { AdminServices } from '../../../../services';

type GlobalStats = {
  total_users: number;
  total_media: number;
  total_view_count: number;
  total_watch_seconds: number;
  total_watch_hours: number;
  average_watch_time_per_view: number;
  average_watch_time_per_media: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<GlobalStats | null>();

  useEffect(() => {
    AdminServices.getGlobalStatistics()
      .then((data) => {
        setStats(data);
      })
      .catch();
  }, []);

  return <Box p={3}>{stats && <ChartsContainer data={stats} />}</Box>;
}
