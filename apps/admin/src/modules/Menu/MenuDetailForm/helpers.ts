import { getFormattedString, getRandomId } from '@common';
import { menuTypeDefault, MenuDetail } from '@model';
import { IMenuDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): IMenuDetailForm => {
  return Object.assign({
    id: 0,
    uid: getRandomId(8),
    name: '',
    type: menuTypeDefault,
    active: true,
    deleted: false,
  });
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: MenuDetail): IMenuDetailForm => {
  return Object.assign({
    ...data,
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: IMenuDetailForm): MenuDetail => {
  const master = Object.assign({
    ...data,
    name: getFormattedString(data.name),
  });

  return { ...master };
};
