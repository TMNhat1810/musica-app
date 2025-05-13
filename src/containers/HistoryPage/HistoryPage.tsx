import { Box, Container, Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LikeLog, ViewLog } from '../../common/interfaces';
import { UserServices } from '../../services';
import HistoryMediaViewItem from './HistoryViewItem/HistoryMediaViewItem';
import { groupLogsByDate, sectionOrder } from './section';

export default function HistoryPage() {
  const [logs, setLogs] = useState<(ViewLog | LikeLog)[]>([]);
  const [page, setPage] = useState<number>(1);
  const [theEnd, setTheEnd] = useState<boolean>(false);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!endRef.current || theEnd) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !theEnd) {
        UserServices.getUserLogs(page)
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
  }, [page, theEnd]);

  const groups = useMemo(() => groupLogsByDate(logs), [logs]);

  return (
    <Container maxWidth="md">
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
                })}
              </Box>
            ),
        )}
      </Box>
      {!theEnd && <Box ref={endRef} sx={{ height: '1px' }} />}
    </Container>
  );
}
