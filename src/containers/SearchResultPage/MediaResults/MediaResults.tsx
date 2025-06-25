import { useEffect, useState } from 'react';
import { Media } from '../../../common/interfaces';
import { useTranslation } from 'react-i18next';
import { MediaServices } from '../../../services';
import { Box, Typography } from '@mui/material';
import MediaDisplay from '../../../components/MediaDisplay';
import { styles } from './style';

interface MediaResultsPropsType {
  query: string;
}

export default function MediaResults({ query }: MediaResultsPropsType) {
  const [results, setResults] = useState<Media[]>([]);
  const [resultsFromRecommender, setResultsFromRecommender] = useState<Media[]>([]);

  const { t } = useTranslation();

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
          <Typography>{t('txt-matching-results')}</Typography>
          <Box sx={styles.mediaPannel}>
            {results.map((media) => (
              <MediaDisplay key={media.id} media={media} />
            ))}
          </Box>
        </Box>
      )}
      {resultsFromRecommender.length > 0 && (
        <Box>
          <Typography>{t('txt-maybe-you-are-searching')}</Typography>
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
