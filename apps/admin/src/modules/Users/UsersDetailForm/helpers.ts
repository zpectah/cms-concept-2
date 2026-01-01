import { getRandomString } from '@common';
import { usersTypeDefault, UsersDetail } from '@model';
import { IUsersDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): IUsersDetailForm => {
  return Object.assign({
    id: 0,
    type: usersTypeDefault,
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    access_rights: 0,
    avatar_image: '',
    avatar_hash: '',
    active: true,
    deleted: false,
  });
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: UsersDetail): IUsersDetailForm => {
  return Object.assign({
    ...data,
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: IUsersDetailForm): UsersDetail => {
  const master = Object.assign({
    ...data,
    avatar_hash: getRandomString(8),
  });

  return { ...master };
};
