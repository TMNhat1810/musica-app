import {
  Box,
  IconButton,
  InputAdornment,
  Pagination,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import UserRow from './UserRow';
import { User } from '../../../../common/interfaces';
import { AdminServices } from '../../../../services';

export default function UserPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = () => {
    setLoading(true);
    AdminServices.getUsers(query)
      .then((data) => {
        setPage(1);
        setTotalPages(data.totalPages);
        setUsers(data.users);
        setLoading(false);
      })
      .catch();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') handleSearch();
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    if (loading) return;
    if (value > totalPages || value < 0) return;
    setLoading(true);
    setPage(value);
    AdminServices.getUsers()
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch();
  };

  useEffect(() => {
    setLoading(true);
    AdminServices.getUsers()
      .then((data) => {
        setPage(1);
        setTotalPages(data.totalPages);
        setUsers(data.users);
        setLoading(false);
      })
      .catch();
  }, []);

  return (
    <Box sx={{}}>
      <Box sx={{ px: 2, py: 1, backgroundColor: 'background.paper' }}>
        <TextField
          placeholder="Search by ID or user's name"
          fullWidth
          value={query}
          size="small"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <TableContainer component={Paper} sx={{ py: 1 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>User</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                Action
              </TableCell>
            </TableRow>
            {users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </TableHead>
        </Table>
        <Pagination
          variant="outlined"
          color="primary"
          showFirstButton
          showLastButton
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{ justifySelf: 'center' }}
        />
      </TableContainer>
    </Box>
  );
}
