import { UsersDetail } from '@model';
import { IProfileDialogForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (detail?: UsersDetail): IProfileDialogForm => {
  return Object.assign({
    id: detail?.id ?? 0,
    uid: detail?.uid ?? '',
    email: detail?.email ?? '',
    password: '',
    first_name: detail?.first_name ?? '',
    last_name: detail?.last_name ?? '',
    avatar_image: detail?.avatar_image ?? '',
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (
  data: IProfileDialogForm,
  profile: Partial<UsersDetail> | null
): UsersDetail => {
  const master = Object.assign({
    ...profile,
    ...data,
  });

  return { ...master };
};
