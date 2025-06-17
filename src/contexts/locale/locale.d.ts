import { LocaleType } from '../../common/types/locale.type';

export type LocaleContextType = {
  locale: 'en' | 'vi';
  changeLocale: (locale: LocaleType) => void;
};
