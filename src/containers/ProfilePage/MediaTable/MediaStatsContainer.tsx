import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Statistics } from '../../../common/types/stats.type';
import { StatisticsServices } from '../../../services';
import { MediaStats } from '../../../components/Statistics';

interface MediaStatsContainerPropsType {
  id: string;
}

export default function MediaStatsContainer({ id }: MediaStatsContainerPropsType) {
  const [stats, setStats] = useState<Statistics['Media'] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    StatisticsServices.getMediaStats(id)
      .then((data) => setStats(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Box>
      {loading && <CircularProgress />}
      {error && <Typography>No statistics data</Typography>}
      {!loading && stats && <MediaStats stats={stats} />}
    </Box>
  );
}
