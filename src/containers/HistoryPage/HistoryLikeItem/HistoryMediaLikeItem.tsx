import { Avatar, Box, Typography } from '@mui/material';
import { LikeLog } from '../../../common/interfaces';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

interface HistoryMediaLikeItemPropsType {
  log: LikeLog;
}

export default function HistoryMediaLikeItem({
  log,
}: HistoryMediaLikeItemPropsType) {
  const media = log.media;
  const { t } = useTranslation();

  return (
    <Link
      to={`/w/${media?.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 1,
          borderRadius: 1,
          ':hover': {
            opacity: 0.8,
          },
        }}
      >
        <img
          src={media?.thumbnail_url}
          alt={media?.title}
          style={{
            width: 120,
            height: 72,
            objectFit: 'cover',
            borderRadius: 4,
          }}
        />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" noWrap>
            {t('txt-you-viewed')}: {media?.title}
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mt={0.5}>
            <Avatar src={media?.user.photo_url} sx={{ width: 20, height: 20 }} />
            <Typography variant="caption" color="text.priamry" noWrap>
              {media?.user.display_name}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.primary">
            {dayjs(log.created_at).fromNow()}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}
