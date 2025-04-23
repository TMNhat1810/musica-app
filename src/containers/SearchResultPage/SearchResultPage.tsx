import { Box, Typography } from '@mui/material';
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
  const [resultsFromRecommender, setResultsFromRecommender] = useState<Media[]>([]);

  useEffect(() => {
    if (!query) return;

    MediaServices.searchMedia(query)
      .then((res) => {
        setResults(res.data);
        if (res.from_recommender) setResultsFromRecommender(res.from_recommender);
      })
      .catch();
  }, [query]);

  return (
    <Box sx={styles.container}>
      {results.length > 0 && (
        <Box>
          <Typography>Matching Results</Typography>
          <Box sx={styles.mediaPannel}>
            {results.map((media) => (
              <MediaDisplay key={media.id} media={media} />
            ))}
          </Box>
        </Box>
      )}
      {resultsFromRecommender.length > 0 && (
        <Box>
          <Typography>Maybe you are searching</Typography>
          <Box sx={styles.mediaPannel}>
            {resultsFromRecommender.map((media) => (
              <MediaDisplay key={media.id} media={media} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
