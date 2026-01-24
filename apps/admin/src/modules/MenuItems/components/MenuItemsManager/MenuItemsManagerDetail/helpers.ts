import { getFormattedString, getRandomId } from '@common';
import {
  menuItemsTypeDefault,
  MenuItemsDetail,
  MenuItemsDetailLocale,
} from '@model';
import { getModelLocales } from '../../../../../helpers';
import { IMenuItemsDetailFormSchema } from './types';

/** Gets default form values */
export const defaultDataToForm = (
  locales: string[],
  menuId: number,
  menuPrefix: string
): IMenuItemsDetailFormSchema => {
  return Object.assign({
    id: 0,
    uid: getRandomId(8),
    name: '',
    type: menuItemsTypeDefault,
    active: true,
    deleted: false,
    locale: getModelLocales<MenuItemsDetailLocale>(locales, {
      label: '',
    }),
    menu_id: menuId,
    parent_id: 0,
    link_page: 0,
    link_url: '',
    item_order: 0,
  });
};

/** Gets formatted detail data to form */
export const detailDataToForm = (
  data: MenuItemsDetail
): IMenuItemsDetailFormSchema => {
  return Object.assign({
    ...data,
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (
  data: IMenuItemsDetailFormSchema
): MenuItemsDetail => {
  const master = Object.assign({
    ...data,
    name: getFormattedString(data.name),
  });

  if (master.type === 'page') {
    master['link_url'] = '';
  }
  if (master.type === 'link') {
    master['link_page'] = 0;
  }
  if (master.type === 'section') {
    master['link_page'] = 0;
    master['link_url'] = '';
  }

  return { ...master };
};
