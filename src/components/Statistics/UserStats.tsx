import { Box, Typography, Paper, Stack } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Statistics } from '../../common/types';

interface UserStatsPropsType {
  stats: Statistics['User'];
}

export default function UserMediaStats({ stats }: UserStatsPropsType) {
  const barData = [
    {
      label: 'Stats',
      Views: stats.total_view_count,
      WatchTime: stats.total_watch_seconds,
    },
  ];

  return (
    <Box p={2}>
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={2}
        justifyContent="space-between"
        mb={4}
      >
        {[
          { label: 'Media Count', value: stats.media_count },
          { label: 'Total Views', value: stats.total_view_count },
          { label: 'Watch Time (hrs)', value: stats.total_watch_hours },
          {
            label: 'Avg. Watch/Media (sec)',
            value: stats.average_watch_time_per_media,
          },
        ].map((stat, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              p: 2,
              flex: '1 1 200px',
              minWidth: 200,
              textAlign: 'center',
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle2">{stat.label}</Typography>
            <Typography variant="h6">{stat.value}</Typography>
          </Paper>
        ))}
      </Stack>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        alignItems="stretch"
      >
        <Box flex={1}>
          <Typography variant="subtitle1" gutterBottom>
            Views vs Watch Time
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Views" fill="#1976d2" />
              <Bar dataKey="WatchTime" fill="#ff7043" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Stack>
    </Box>
  );
}
