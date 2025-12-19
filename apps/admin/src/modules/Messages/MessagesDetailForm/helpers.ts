import { IMessagesDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): IMessagesDetailForm => {
  return {};
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: object): IMessagesDetailForm => {
  return {};
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: IMessagesDetailForm): object => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};