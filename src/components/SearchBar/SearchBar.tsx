import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { styles } from './style';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SearchBar() {
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = () => {
    if (!query) return;
    navigate('/r?query=' + encodeURIComponent(query));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') handleSearch();
  };

  return (
    <Box sx={styles.container}>
      <TextField
        placeholder={t('search')}
        fullWidth
        value={query}
        size="small"
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleSearch}
                  sx={{
                    '&:focus, &:active, &:hover': {
                      outline: 'none',
                      border: 'none',
                    },
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            py: '2px',
            px: '4px',
            fontSize: 16,
            '& input': {
              py: 1,
              pr: 1,
              pl: 2,
            },
            '& fieldset': {
              borderWidth: 2,
            },
            '&:hover fieldset': {},
            '&.Mui-focused fieldset': {},
          },
        }}
      />
    </Box>
  );
}
