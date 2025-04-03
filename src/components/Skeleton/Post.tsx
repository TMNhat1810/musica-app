import { Skeleton, Stack, Card } from '@mui/material';

const PostSkeleton = () => {
  return (
    <Card sx={{ padding: 2, maxWidth: 800, margin: 'auto' }}>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={100} height={20} />
      </Stack>
      <Skeleton variant="text" width="80%" height={30} />
      <Skeleton variant="rectangular" width="100%" height={200} sx={{ my: 2 }} />
      <Stack spacing={1}>
        <Skeleton variant="text" width="90%" height={20} />
        <Skeleton variant="text" width="95%" height={20} />
        <Skeleton variant="text" width="80%" height={20} />
      </Stack>
    </Card>
  );
};

export default PostSkeleton;
