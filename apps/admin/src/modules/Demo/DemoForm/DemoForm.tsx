import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Input,
  SearchInput,
  Select,
  TagSelect,
  ButtonSelect,
  EmailInput,
  PasswordInput,
  PhoneInput,
  NumberInput,
  NumberAltInput,
  Textarea,
  Wysiwyg,
  Checkbox,
  Switch,
  Radio,
  RadioGroup,
  DatePicker,
  DateTimePicker,
  Field,
  ControlledForm,
  Button,
  InputField,
  EmailField,
} from '../../../components';
import { IDemoForm } from './types';
import { demoFormSchema } from './schema';

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

const DemoForm = () => {
  const form = useForm<IDemoForm>({
    defaultValues: {},
    resolver: zodResolver(demoFormSchema),
  });

  return (
    <>
      <Stack>
        <Stack>
          <Input placeholder="Default input" />
          <NumberInput placeholder="Number input" />
          <NumberAltInput placeholder="Also number input" />
          <SearchInput placeholder="Search input" />
          <EmailInput placeholder="Email input" />
          <PasswordInput placeholder="Password input" />
          <PasswordInput
            placeholder="Password input with initial show"
            initialShow
          />
          <PasswordInput
            placeholder="Password input without toggle"
            disableToggle
          />
          <PhoneInput placeholder="Phone input" />
          <Textarea placeholder="Textarea" />
          <Wysiwyg placeholder="Wysiwyg editor" />
        </Stack>
        <Stack>
          <Checkbox label="Checkbox label" />
          <Checkbox label="Checkbox label checked" checked />
          <Switch label="Switch label" />
          <Switch label="Switch label checked" checked />
          <Radio label="Radio label" />
          <Radio label="Radio label checked" checked />
          <RadioGroup items={optionsString} defaultValue="two" />
        </Stack>
        <Stack>
          <DatePicker />
          <DateTimePicker />
        </Stack>
        <Stack>
          <Select
            placeholder="Select single"
            defaultValue={2}
            options={optionsNumeric}
          />
          <Select
            placeholder="Select multiple"
            defaultValue={[2]}
            options={optionsNumeric}
            multiple
          />
          <TagSelect defaultValue={'two'} options={optionsString} />
          <TagSelect defaultValue={['two']} options={optionsString} multiple />
          <ButtonSelect defaultValue={'two'} options={optionsString} />
        </Stack>
        <Stack>
          <Field
            label="Field label responsive"
            isRequired
            id={'input-id'}
            helpers={['Helper text 1', 'Helper text 2']}
            errors={['Error text 1', 'Error text 2']}
          >
            <EmailInput id="input-id" placeholder="Email input" fullWidth />
          </Field>
          <Field label="Field label horizontal" layout="horizontal">
            <EmailInput placeholder="Email input" fullWidth />
          </Field>
          <Field label="Field label vertical" layout="vertical">
            <EmailInput placeholder="Email input" fullWidth />
          </Field>
        </Stack>
      </Stack>
      <ControlledForm form={form}>
        <Stack>
          <Stack>
            <InputField
              name="inputText"
              label="Input field label"
              inputProps={{ fullWidth: true, placeholder: 'Field placeholder' }}
              isRequired
            />
            <EmailField
              name="inputEmail"
              label="Email field label"
              inputProps={{ fullWidth: true, placeholder: 'Field placeholder' }}
              isRequired
            />
          </Stack>
          <Stack>
            <Button type="submit">Submit</Button>
          </Stack>
        </Stack>
      </ControlledForm>
    </>
  );
};

export default DemoForm;
