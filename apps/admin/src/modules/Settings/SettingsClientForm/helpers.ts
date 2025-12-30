import { SettingsClient } from '@model';
import { metaRobotsDefault } from '@common';
import { ISettingsClientForm } from './types';

/** Gets formatted form data to form */
export const detailDataToForm = (
  data?: SettingsClient
): ISettingsClientForm => {
  return Object.assign({
    meta: {
      title: data?.meta.title ?? '',
      description: data?.meta.description ?? '',
      keywords: data?.meta.keywords ?? [],
      robots: data?.meta.robots ?? metaRobotsDefault,
    },
    state: {
      debug: data?.state.debug ?? false,
      maintenance: data?.state.maintenance ?? false,
    },
    messages: {
      active: data?.messages.active ?? true,
    },
    comments: {
      active: data?.comments.active ?? true,
    },
    email: {
      smtp: {
        ...data?.email.smtp,
        port: data?.email.smtp.port ?? 587,
        host: data?.email.smtp.host ?? '',
        username: data?.email.smtp.username ?? '',
        password: '',
      },
    },
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: ISettingsClientForm): SettingsClient => {
  return Object.assign({
    ...data,
  });
};
