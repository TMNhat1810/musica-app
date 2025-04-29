import {
  Box,
  Container,
  IconButton,
  InputAdornment,
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

  const handleSearch = () => {
    if (id)
      UserServices.getUserMedia(id, query)
        .then((data) => setMedias(data.medias))
        .catch();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') handleSearch();
  };

  useEffect(() => {
    if (id)
      UserServices.getUserMedia(id)
        .then((data) => setMedias(data.medias))
        .catch();
  }, [id]);

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xl">
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
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Media</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Duration</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">
                  Action
                </TableCell>
              </TableRow>
              {medias.map((media) => (
                <MediaRow key={media.id} media={media} />
              ))}
            </TableHead>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
