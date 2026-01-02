import { getFormattedString } from '@common';
import { customFieldsTypeDefault, CustomFieldsDetail } from '@model';
import { ICustomFieldsDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): ICustomFieldsDetailForm => {
  return Object.assign({
    id: 0,
    active: true,
    deleted: false,
    name: '',
    type: customFieldsTypeDefault,
  });
};

/** Gets formatted detail data to form */
export const detailDataToForm = (
  data: CustomFieldsDetail
): ICustomFieldsDetailForm => {
  return Object.assign({
    ...data,
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (
  data: ICustomFieldsDetailForm
): CustomFieldsDetail => {
  const master = Object.assign({
    ...data,
    name: getFormattedString(data.name),
  });

  return { ...master };
};
