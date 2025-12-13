import { Stack } from '@mui/material';
import {
  Input,
  SearchInput,
  Select,
  TagSelect,
  ButtonSelect,
} from '../../../components';

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
  return (
    <>
      <Stack>
        <Stack>
          <Input placeholder="Default input" />
          <SearchInput placeholder="Search input" />
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
      </Stack>
      <form>...DemoForm...</form>
    </>
  );
};

export default DemoForm;
