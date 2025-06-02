import { Box, Avatar, Typography, Button, Tooltip } from '@mui/material';
import { User } from '../../common/interfaces';

interface UserPanelPropsType {
  users: User[];
  selectedId: string | null;
  onUserSelect: (id: string) => void;
}

export default function UserPanel({
  users,
  selectedId,
  onUserSelect,
}: UserPanelPropsType) {
  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        gap: 2,
        py: 2,
        px: 1,
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          height: 6,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ccc',
          borderRadius: 3,
        },
      }}
    >
      {users.map((user) => (
        <Tooltip title={user.display_name}>
          <Button
            key={user.id}
            sx={{
              minWidth: 80,
              maxWidth: 100,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              textAlign: 'center',
              borderRadius: 5,
              color: 'inherit',
              textTransform: 'none',
              '&:active, &:focus': {
                border: 'none',
                outline: 'none',
              },
              ...(selectedId &&
                (selectedId === user.id
                  ? { bgcolor: 'background.paper' }
                  : { opacity: 0.7 })),
            }}
            onClick={() => onUserSelect(user.id)}
          >
            <Avatar
              src={user.photo_url}
              alt={user.username}
              sx={{ width: 48, height: 48 }}
            />
            <Typography
              variant="subtitle1"
              noWrap
              sx={{
                width: '100%',
                fontWeight: 500,
                fontSize: '0.95rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user.display_name}
            </Typography>
          </Button>
        </Tooltip>
      ))}
    </Box>
  );
}
