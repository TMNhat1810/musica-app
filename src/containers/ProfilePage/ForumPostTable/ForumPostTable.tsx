import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styles } from './style';
import { useEffect, useState } from 'react';
import { ForumPost } from '../../../common/interfaces';
import { UserServices } from '../../../services';
import { useParams } from 'react-router-dom';
import ForumPostTableRow from './ForumPostTableRow';

export default function ForumPostTable() {
  const { id } = useParams();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [query, setQuery] = useState<string>('');

  const handleSearch = () => {
    if (id)
      UserServices.getUserForumPost(id, query)
        .then((data) => setPosts(data.posts))
        .catch();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') handleSearch();
  };

  useEffect(() => {
    if (id)
      UserServices.getUserForumPost(id)
        .then((data) => setPosts(data.posts))
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
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Post</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <ForumPostTableRow key={post.id} post={post} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
