import { Box, Chip, IconButton } from '@mui/material';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MediaResults from './MediaResults';
import { styles } from './style';
import { useCallback, useState } from 'react';
import UserResults from './UserResults';

export default function SearchResultPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  const [selectedSection, setSelectedSection] = useState<string>(
    searchParams.get('tab') || 'media',
  );

  const handleChangeTab = useCallback(
    (newTab: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('tab', newTab);
      setSearchParams(newParams);
      setSelectedSection(newTab);
    },
    [searchParams, setSearchParams],
  );

  const { t } = useTranslation();

  if (!query) return <Navigate to="/" />;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.chipContainer}>
        <IconButton
          sx={{
            '&:focus, &:active': {
              border: 'none',
              outline: 'none',
            },
            p: 0,
          }}
          onClick={() => handleChangeTab('media')}
        >
          <Chip
            label="Media"
            sx={{
              ...styles.chip,
              ...(selectedSection === 'media' && {
                borderColor: 'primary.main',
                color: 'primary.main',
              }),
            }}
          />
        </IconButton>
        <IconButton
          sx={{
            '&:focus, &:active': {
              border: 'none',
              outline: 'none',
            },
            p: 0,
          }}
          onClick={() => handleChangeTab('user')}
        >
          <Chip
            label={t('user')}
            sx={{
              ...styles.chip,
              ...(selectedSection === 'user' && {
                borderColor: 'primary.main',
                color: 'primary.main',
              }),
            }}
          />
        </IconButton>
      </Box>
      <Box sx={{ flex: 1, pt: 1 }}>
        {selectedSection === 'media' && query && <MediaResults query={query} />}
        {selectedSection === 'user' && query && <UserResults query={query} />}
      </Box>
    </Box>
  );
}
