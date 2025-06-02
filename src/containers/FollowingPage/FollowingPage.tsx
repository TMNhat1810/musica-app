import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { User } from '../../common/interfaces';
import { UserServices } from '../../services';
import { styles } from './style';
import UserPanel from './UserPanel';
import MediaPanel from './MediaPanel';

export default function FollowingPage() {
  const [channels, setChannels] = useState<User[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    UserServices.getCurrentUserFollowees()
      .then((data) =>
        setChannels(data.map((record: { followee: User }) => record.followee)),
      )
      .catch();
  }, []);

  return (
    <Box sx={styles.container}>
      <UserPanel
        users={channels}
        selectedId={selectedId}
        onUserSelect={(id: string) => {
          if (selectedId !== id) setSelectedId(id);
          else setSelectedId(null);
        }}
      />
      <MediaPanel selectedUserId={selectedId} />
    </Box>
  );
}
