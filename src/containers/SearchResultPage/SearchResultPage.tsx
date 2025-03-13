import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Media } from '../../common/interfaces';
import { MediaServices } from '../../services';
import { styles } from './style';
import MediaDisplay from '../../components/MediaDisplay';

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  const [results, setResults] = useState<Media[]>([]);

  useEffect(() => {
    if (!query) return;

    MediaServices.searchMedia(query)
      .then((data) => setResults(data))
      .catch();
  }, [query]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.mediaPannel}>
        {results.map((media) => (
          <MediaDisplay key={media.id} media={media} />
        ))}
      </Box>
    </Box>
  );
}
