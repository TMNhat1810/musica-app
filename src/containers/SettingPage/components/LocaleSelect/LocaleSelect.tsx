import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import 'flag-icons/css/flag-icons.min.css';

const locales = [
  { code: 'en', label: 'English', flagCode: 'us' },
  { code: 'vi', label: 'Tiếng Việt', flagCode: 'vn' },
];

export default function LocaleSelect() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const handleChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 140 }}>
      <Select
        variant="outlined"
        value={currentLang}
        onChange={handleChange}
        sx={{
          svg: {
            color: 'text.primary',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'text.primary',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
        }}
      >
        {locales.map((locale) => (
          <MenuItem key={locale.code} value={locale.code} sx={{ mt: 1 }}>
            <span
              className={`fi fi-${locale.flagCode}`}
              style={{ marginRight: '8px' }}
            ></span>
            {locale.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
