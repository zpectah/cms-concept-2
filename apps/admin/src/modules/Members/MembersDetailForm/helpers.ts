import dayjs from 'dayjs';
import { getRandomString, personSexDefault } from '@common';
import { membersTypeDefault, MembersDetail } from '@model';
import { addressFormDefaults } from '../../../constants';
import { IMembersDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): IMembersDetailForm => {
  return Object.assign({
    id: 0,
    uid: getRandomString(),
    type: membersTypeDefault,
    email: '',
    first_name: '',
    last_name: '',
    address: addressFormDefaults,
    sex: personSexDefault,
    birthdate: null,
    flat_no: '',
    description: '',
    avatar_image: '',
    avatar_hash: '',
    active: true,
    deleted: false,
  });
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: MembersDetail): IMembersDetailForm => {
  return Object.assign({
    ...data,
    birthdate: data.birthdate ? dayjs(data.birthdate) : null,
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: IMembersDetailForm): MembersDetail => {
  const master = Object.assign({
    ...data,
    avatar_hash: getRandomString(6),
  });

  return { ...master };
};
