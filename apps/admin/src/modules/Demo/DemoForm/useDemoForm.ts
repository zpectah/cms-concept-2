import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IDemoForm } from './types';
import { demoFormSchema } from './schema';
import { getFormDefaultValues } from './helpers';

const optionsString = [
  {
    id: 'one',
    value: 'one',
    label: 'One',
  },
  {
    id: 'two',
    value: 'two',
    label: 'Two',
  },
  {
    id: 'three',
    value: 'three',
    label: 'Three',
  },
  {
    id: 'four',
    value: 'four',
    label: 'Four',
    hidden: true,
  },
  {
    id: 'five',
    value: 'five',
    label: 'Five',
    disabled: true,
  },
];
const optionsNumeric = [
  {
    id: '1',
    value: 1,
    label: '1',
  },
  {
    id: '2',
    value: 2,
    label: '2',
  },
  {
    id: '3',
    value: 3,
    label: '3',
  },
  {
    id: '4',
    value: 4,
    label: '4',
    hidden: true,
  },
  {
    id: '5',
    value: 5,
    label: '5',
    disabled: true,
  },
];

export const useDemoForm = () => {
  const form = useForm<IDemoForm>({
    defaultValues: getFormDefaultValues(),
    resolver: zodResolver(demoFormSchema),
  });

  const submitHandler: SubmitHandler<IDemoForm> = (data) => {
    console.log('on submit', data);
  };

  const resetHandler = () => form.reset(getFormDefaultValues());

  return {
    form,
    onSubmit: form.handleSubmit(submitHandler),
    onReset: resetHandler,
    options: {
      string: optionsString,
      numeric: optionsNumeric,
    },
  };
};
