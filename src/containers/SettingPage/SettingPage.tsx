import { Box, Container, Typography } from '@mui/material';
import { styles } from './style';
import { useTranslation } from 'react-i18next';
import LocaleSelect from './components/LocaleSelect/LocaleSelect';

export default function SettingPage() {
  const { t } = useTranslation();

  return (
    <Box sx={styles.container}>
      <Container maxWidth="lg">
        <Typography variant="h5" fontWeight="bold">
          {t('general-setting')}
        </Typography>
        <Box sx={styles.settingContainer}>
          <Box sx={styles.setting}>
            <Typography variant="h6">{t('language')}</Typography>
            <LocaleSelect />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
