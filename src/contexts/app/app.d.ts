import { AppSettingType } from '../../common/types';

export type AppContextType = {
  setting: AppSettingType;
  changeVolume: (volume: number) => void;
};
