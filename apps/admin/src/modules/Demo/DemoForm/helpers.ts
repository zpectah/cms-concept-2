import { IDemoForm } from './types';

export const getFormDefaultValues = (): IDemoForm => {
  return Object.assign({
    inputText: '',
    inputEmail: '',
    selectString: 'two',
    selectNumber: 2,
    date: null,
    dateTime: null,
    inputNumberA: 3,
    inputNumberB: 0,
    textarea: '',
    wysiwyg: '',

    phone: '',
    password: '',
    checkbox: true,
    switch: true,
    radioGroup: 'two',
    /* TODO */
  });
};
