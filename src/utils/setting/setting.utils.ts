import { AppSettingType } from '../../common/types';

export const getAppSetting = () => {
  const str = localStorage.getItem('setting');
  if (!str) return {};
  try {
    const setting: AppSettingType = JSON.parse(str);
    return setting;
  } catch {
    return {};
  }
};

export const saveAppSetting = (setting: AppSettingType) => {
  localStorage.setItem('setting', JSON.stringify(setting));
};
