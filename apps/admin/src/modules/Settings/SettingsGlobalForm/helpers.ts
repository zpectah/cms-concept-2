import { SettingsGlobal } from '@model';
import { addressFormDefaults } from '../../../constants';
import { ISettingsGlobalForm } from './types';

/** Gets formatted form data to form */
export const detailDataToForm = (
  data?: SettingsGlobal
): ISettingsGlobalForm => {
  return Object.assign({
    project: {
      name: data?.project.name ?? '',
      description: data?.project.description ?? '',
    },
    company: {
      name: data?.company.name ?? '',
      description: data?.company.description ?? '',
      id: data?.company.id,
      email: data?.company.email ?? [],
      phone: data?.company.phone ?? [],
      address: data?.company.address ?? addressFormDefaults,
      location: data?.company.location ?? [0, 0],
      bank: data?.company.bank ?? '',
    },
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: ISettingsGlobalForm): SettingsGlobal => {
  return Object.assign({
    ...data,
    company: {
      ...data.company,
      address: {
        ...data.company.address,
        zip: String(data.company.address?.zip ?? ''),
      },
    },
  });
};
