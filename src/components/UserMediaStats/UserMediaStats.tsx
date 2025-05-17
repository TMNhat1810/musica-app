import { Box, Typography, Paper, Stack } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Statistics } from '../../common/interfaces/stats.interface';

interface UserMediaStatsPropsType {
  stats: Statistics;
}

const COLORS = ['#1976d2', '#66bb6a', '#ff7043'];

export default function UserMediaStats({ stats }: UserMediaStatsPropsType) {
  const pieData = [
    { name: 'Watch Time (hrs)', value: stats.total_watch_hours },
    { name: 'Media Count', value: stats.media_count },
    { name: 'Views', value: stats.total_view_count / 100 },
  ];

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
            Visual Breakdown
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>

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
