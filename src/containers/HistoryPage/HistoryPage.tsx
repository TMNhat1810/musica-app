import { Box, Chip, Container, IconButton, Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LikeLog, ViewLog } from '../../common/interfaces';
import { UserServices } from '../../services';
import { HistoryMediaViewItem } from './HistoryViewItem';
import { groupLogsByDate, sectionOrder } from './section';
import { HistoryMediaLikeItem } from './HistoryLikeItem';

const tags: { label: string; action: string }[] = [
  { label: 'all', action: 'all' },
  { label: 'view', action: 'view_media' },
  { label: 'like', action: 'like_media' },
];

export default function HistoryPage() {
  const [logs, setLogs] = useState<(ViewLog | LikeLog)[]>([]);
  const [page, setPage] = useState<number>(1);
  const [theEnd, setTheEnd] = useState<boolean>(false);
  const [tag, setTag] = useState<{ label: string; action: string }>(tags[0]);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!endRef.current || theEnd) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !theEnd) {
        UserServices.getUserLogs(tag.action, page)
          .then((data) => {
            setLogs((prev) => [...prev, ...data.logs]);
            if (page + 1 > data.totalPages) setTheEnd(true);
            else setPage((page) => page + 1);
          })
          .catch();
      }
    });

    observer.observe(endRef.current);

    return () => observer.disconnect();
  }, [page, tag, theEnd]);

  useEffect(() => {
    setLogs([]);
    setPage(1);
    setTheEnd(false);
  }, [tag]);

  const groups = useMemo(() => groupLogsByDate(logs), [logs]);

  return (
    <Container maxWidth="md" sx={{ pt: 1 }}>
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        {tags.map((item) => (
          <IconButton
            sx={{ '&:focus, &:active': { outline: 'none', border: 'none' }, p: 0 }}
            onClick={() => setTag(item)}
          >
            <Chip
              key={item.label}
              label={item.label}
              sx={{
                border: '2px solid',
                ...(tag.label === item.label && {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                }),
              }}
            />
          </IconButton>
        ))}
      </Box>
      <Box>
        {sectionOrder.map(
          (section) =>
            groups[section].length > 0 && (
              <Box key={section} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {section}
                </Typography>
                {groups[section].map((log) => {
                  if (log.action === 'view_media')
                    return <HistoryMediaViewItem key={log.id} log={log} />;
                  if (log.action === 'like_media')
                    return <HistoryMediaLikeItem key={log.id} log={log} />;
                })}
              </Box>
            ),
        )}
      </Box>
      {!theEnd && <Box ref={endRef} sx={{ height: '1px' }} />}
    </Container>
  );
}
