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
import { styles } from './style';
import { useEffect, useState } from 'react';
import { Media } from '../../../common/interfaces';
import { UserServices } from '../../../services';
import { useParams } from 'react-router-dom';
import MediaRow from './MediaRow';

export default function MediaTable() {
  const { id } = useParams();
  const [medias, setMedias] = useState<Media[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = () => {
    if (!id) return;
    setLoading(true);
    UserServices.getUserMedia(id, query)
      .then((data) => {
        setPage(1);
        setTotalPages(data.totalPages);
        setMedias(data.medias);
        setLoading(false);
      })
      .catch();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') handleSearch();
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    if (loading) return;
    if (!id) return;
    if (value > totalPages || value < 0) return;
    setLoading(true);
    setPage(value);
    UserServices.getUserMedia(id, undefined, value)
      .then((data) => {
        setLoading(false);
        setMedias(data.medias);
      })
      .catch();
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    UserServices.getUserMedia(id)
      .then((data) => {
        setTotalPages(data.totalPages);
        setMedias(data.medias);
        setLoading(false);
      })
      .catch();
  }, [id]);

  return (
    <Box sx={styles.container}>
      <Box sx={{ px: 2, py: 1, backgroundColor: 'background.paper' }}>
        <TextField
          placeholder="Search by ID or Title"
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
              <TableCell sx={{ fontWeight: 'bold' }}>Media</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Duration</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                Action
              </TableCell>
            </TableRow>
            {medias.map((media) => (
              <MediaRow key={media.id} media={media} />
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
