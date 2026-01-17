import { blacklistTypeDefault, BlacklistDetail } from '@model';
import { ISettingsBlacklistDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): ISettingsBlacklistDetailForm => {
  return Object.assign({
    id: 0,
    type: blacklistTypeDefault,
    email: '',
    ipaddress: '',
    active: true,
    deleted: false,
  });
};

/** Gets formatted detail data to form */
export const detailDataToForm = (
  data: BlacklistDetail
): ISettingsBlacklistDetailForm => {
  return Object.assign({
    ...data,
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (
  data: ISettingsBlacklistDetailForm
): BlacklistDetail => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};
