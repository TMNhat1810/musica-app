import { ReactNode, useRef } from 'react';
import { AppContext } from './app.context';
import { AppSettingType } from '../../common/types';
import { SettingUtils } from '../../utils/setting';

interface AppProviderPropsType {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderPropsType) {
  const setting = useRef<AppSettingType>(SettingUtils.getAppSetting());

  const changeVolume = (volume: number) => {
    setting.current = { ...setting.current, media_volumn: volume };
    SettingUtils.saveAppSetting(setting.current);
  };

  return (
    <AppContext.Provider value={{ setting: setting.current, changeVolume }}>
      {children}
    </AppContext.Provider>
  );
}
