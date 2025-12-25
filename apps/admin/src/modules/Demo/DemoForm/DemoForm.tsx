import { Stack, Grid } from '@mui/material';
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
  //
  InputField,
  EmailField,
  SelectField,
  DatePickerField,
  DateTimePickerField,
  NumberField,
  NumberAltField,
  TextareaField,
  WysiwygField,
} from '../../../components';
import { useDemoForm } from './useDemoForm';

const DemoForm = () => {
  const {
    form,
    onSubmit,
    onReset,
    options: { string: optionsString, numeric: optionsNumeric },
  } = useDemoForm();

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
          <Textarea placeholder="Textarea i" />
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
        <Grid container spacing={2}>
          <Field
            label="Field label responsive"
            isRequired
            htmlFor={'input-id'}
            helpers={['Helper text 1', 'Helper text 2']}
            errors={['Error text 1', 'Error text 2']}
          >
            <EmailInput id="input-id" placeholder="Email input" fullWidth />
          </Field>
          <Field
            label="Field label always horizontal"
            labelCaption="Label caption text"
            layout="horizontal"
            htmlFor={'input-id-2'}
          >
            <EmailInput id="input-id-2" placeholder="Email input" fullWidth />
          </Field>
          <Field label="Field label vertical" layout="vertical">
            <EmailInput placeholder="Email input" fullWidth />
          </Field>
        </Grid>
      </Stack>
      <ControlledForm form={form} onSubmit={onSubmit}>
        <Stack>
          <Grid container spacing={2}>
            <InputField
              name="inputText"
              label="Input field label"
              placeholder={'Field placeholder'}
              isFullWidth
              isRequired
            />
            <EmailField
              name="inputEmail"
              label="Email field label"
              placeholder={'Field placeholder'}
              isFullWidth
              isRequired
            />
            <SelectField
              name="selectString"
              label="Select field label"
              placeholder={'Field placeholder'}
              options={optionsString}
              isFullWidth
            />
            <SelectField
              name="selectNumber"
              label="Select field label"
              placeholder={'Field placeholder'}
              options={optionsNumeric}
              isFullWidth
              isRequired
            />
            <DatePickerField
              name="date"
              label="Date picker field"
              placeholder={'Pick your date'}
              isFullWidth
            />
            <DateTimePickerField
              name="dateTime"
              label="Date time picker field"
              placeholder={'Pick your date and time'}
              isFullWidth
            />
            <NumberField
              name="inputNumberA"
              label="inputNumberA"
              placeholder={'Field placeholder'}
              isFullWidth
            />
            <NumberAltField
              name="inputNumberB"
              label="inputNumberB"
              placeholder={'Field placeholder'}
              isFullWidth
            />
            <TextareaField
              name="textarea"
              label="textarea field label"
              placeholder={'Field placeholder'}
              isFullWidth
              labelWrapperProps={{
                justifyContent: 'flex-start',
                sx: {
                  pt: {
                    xs: 0,
                    md: 2,
                  },
                },
              }}
            />
            <WysiwygField
              name="wysiwyg"
              label="wysiwyg field label"
              placeholder={'Field placeholder'}
            />
          </Grid>
          <Stack>
            <Button type="submit">Submit</Button>
            <Button onClick={onReset}>Reset</Button>
          </Stack>
        </Stack>
      </ControlledForm>
    </>
  );
};

export default DemoForm;
