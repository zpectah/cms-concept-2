import { getFormattedString } from '@common';
import { tagsTypeDefault, tagsColorDefault, TagsDetail } from '@model';
import { ITagsDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): ITagsDetailForm => {
  return Object.assign({
    id: 0,
    active: true,
    deleted: false,
    name: '',
    type: tagsTypeDefault,
    color: tagsColorDefault,
  });
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: TagsDetail): ITagsDetailForm => {
  return Object.assign({
    ...data,
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: ITagsDetailForm): TagsDetail => {
  const master = Object.assign({
    ...data,
    name: getFormattedString(data.name),
  });

  return { ...master };
};
