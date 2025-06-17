import { useState, ReactNode, useEffect } from 'react';
import { LocaleContext } from './locale.context';
import { LocaleType } from '../../common/types/locale.type';
import i18n from '../../common/i18n';
import dayjs from 'dayjs';

interface LocaleProviderPropType {
  children: ReactNode;
}

export default function LocaleProvider({ children }: LocaleProviderPropType) {
  const [locale, setLocale] = useState<LocaleType>(
    (localStorage.getItem('locale') as LocaleType) || 'vi',
  );

  const changeLocale = (locale: LocaleType) => setLocale(locale);

  useEffect(() => {
    i18n.changeLanguage(locale);
    dayjs.locale(locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
