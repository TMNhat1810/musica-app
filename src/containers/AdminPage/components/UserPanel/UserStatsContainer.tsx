import { Box } from '@mui/material';
import { StatisticsServices } from '../../../../services';
import { useEffect, useState } from 'react';
import { Statistics } from '../../../../common/types';
import { UserStats } from '../../../../components/Statistics';

interface UserStatsContainerPropsType {
  id: string;
}

export default function UserStatsContainer({ id }: UserStatsContainerPropsType) {
  const [stats, setStats] = useState<Statistics['User'] | null>(null);

  useEffect(() => {
    if (!id) return;
    StatisticsServices.getUserStats(id)
      .then((data) => setStats(data))
      .catch();
  }, [id]);

  return <Box>{stats && <UserStats stats={stats} />}</Box>;
}
