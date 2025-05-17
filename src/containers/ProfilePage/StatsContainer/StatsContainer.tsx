import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Statistics } from '../../../common/interfaces/stats.interface';
import UserMediaStats from '../../../components/UserMediaStats';
import { StatisticsServices } from '../../../services';
import { useAuth } from '../../../hooks';

export default function StatsContainer() {
  const [stats, setStats] = useState<Statistics | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (user)
      StatisticsServices.getUserStats(user?.id)
        .then((data) => setStats(data))
        .catch();
  }, [user]);

  return <Box>{stats && <UserMediaStats stats={stats} />}</Box>;
}
