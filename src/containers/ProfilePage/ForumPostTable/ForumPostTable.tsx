import {
  Box,
  IconButton,
  InputAdornment,
  Pagination,
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
import { useTranslation } from 'react-i18next';

export default function ForumPostTable() {
  const { id } = useParams();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const { t } = useTranslation();

  const handleSearch = () => {
    if (!id) return;
    setLoading(true);
    UserServices.getUserForumPost(id, query)
      .then((data) => {
        setPosts(data.posts);
        setTotalPages(data.totalPages);
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
    UserServices.getUserForumPost(id, undefined, value)
      .then((data) => {
        setLoading(false);
        setPosts(data.posts);
      })
      .catch();
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    UserServices.getUserForumPost(id)
      .then((data) => {
        setPosts(data.posts);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch();
  }, [id]);

  return (
    <Box sx={styles.container}>
      <Box sx={{ px: 2, py: 1, backgroundColor: 'background.paper' }}>
        <TextField
          placeholder={t('search-by-id-or-name-message')}
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
              <TableCell sx={{ fontWeight: 'bold' }}>{t('post-title')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>{t('tag')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                {t('action')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <ForumPostTableRow key={post.id} post={post} />
            ))}
          </TableBody>
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
