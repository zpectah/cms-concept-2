import { messagesTypeDefault, MessagesDetail } from '@model';
import { IMessagesDetailForm } from './types';

/** Gets default form values */
export const defaultDataToForm = (): IMessagesDetailForm => {
  return Object.assign({
    id: 0,
    sender: '',
    subject: '',
    content: '',
    type: messagesTypeDefault,
    read: false,
    active: true,
    deleted: false,
  });
};

/** Gets formatted detail data to form */
export const detailDataToForm = (data: MessagesDetail): IMessagesDetailForm => {
  return Object.assign({
    ...data,
  });
};

/** Gets formatted form data to master before submit */
export const formDataToMaster = (data: IMessagesDetailForm): MessagesDetail => {
  const master = Object.assign({
    ...data,
  });

  return { ...master };
};
