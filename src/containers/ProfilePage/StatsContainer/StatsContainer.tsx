import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Statistics } from '../../../common/types/stats.type';
import { UserStats } from '../../../components/Statistics';
import { StatisticsServices } from '../../../services';
import { useAuth } from '../../../hooks';

export default function StatsContainer() {
  const [stats, setStats] = useState<Statistics['User'] | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (user)
      StatisticsServices.getUserStats(user?.id)
        .then((data) => setStats(data))
        .catch();
  }, [user]);

  return <Box>{stats && <UserStats stats={stats} />}</Box>;
}
