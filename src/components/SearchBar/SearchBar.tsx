import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { styles } from './style';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/r?query=' + encodeURIComponent(query));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') handleSearch();
  };

  return (
    <Box sx={styles.container}>
      <TextField
        placeholder="Search"
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
  );
}
