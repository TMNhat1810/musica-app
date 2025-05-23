import { Box, Paper, Stack, Typography, useTheme } from '@mui/material';
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type GlobalStats = {
  total_users: number;
  total_media: number;
  total_view_count: number;
  total_watch_seconds: number;
  total_watch_hours: number;
  average_watch_time_per_view: number;
  average_watch_time_per_media: number;
};

type ChartsContainerPropsType = {
  data: GlobalStats;
};

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <Paper elevation={2} sx={{ p: 2, flex: 1, minWidth: 180 }}>
    <Typography variant="subtitle2" color="text.primary">
      {label}
    </Typography>
    <Typography variant="h6">{value}</Typography>
  </Paper>
);

export default function ChartsContainer({ data }: ChartsContainerPropsType) {
  const theme = useTheme();

  const barChartData = [
    { name: 'Users', value: data.total_users },
    { name: 'Media', value: data.total_media },
    { name: 'Views', value: data.total_view_count },
  ];

  const pieChartData = [
    { name: 'Avg Watch/View', value: data.average_watch_time_per_view },
    { name: 'Avg Watch/Media', value: data.average_watch_time_per_media },
  ];

  const pieColors = [theme.palette.primary.main, theme.palette.secondary.main];

  return (
    <Box p={3}>
      <Typography variant="h5" mb={3}>
        📊 Global Platform Statistics
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={2} mb={4}>
        <StatCard label="Total Users" value={data.total_users} />
        <StatCard label="Total Media" value={data.total_media} />
        <StatCard label="Total Views" value={data.total_view_count} />
        <StatCard label="Total Watch Seconds" value={data.total_watch_seconds} />
        <StatCard label="Total Watch Hours" value={data.total_watch_hours} />
        <StatCard
          label="Avg Watch Time/View (sec)"
          value={data.average_watch_time_per_view}
        />
        <StatCard
          label="Avg Watch Time/Media (sec)"
          value={data.average_watch_time_per_media}
        />
      </Stack>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={4}>
        <Paper sx={{ flex: 1, p: 2 }}>
          <Typography variant="subtitle1" mb={1}>
            User / Media / Views
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill={theme.palette.primary.main} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
        <Paper sx={{ flex: 1, p: 2 }}>
          <Typography variant="subtitle1" mb={1}>
            Avg Watch Time
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                innerRadius={40}
                outerRadius={80}
                label
              >
                {pieChartData.map((_, index) => (
                  <Cell key={index} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Stack>
    </Box>
  );
}
