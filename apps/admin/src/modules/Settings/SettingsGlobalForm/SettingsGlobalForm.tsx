import { Grid } from '@mui/material';
import { SPACING } from '../../../constants';
import {
  ControlledForm,
  InputField,
  TextareaField,
  AddressField,
  ValuePickerField,
} from '../../../components';
import { useSettingsGlobalForm } from './useSettingsGlobalForm';

const SettingsGlobalForm = () => {
  const { form, onSubmit } = useSettingsGlobalForm();

  return (
    <ControlledForm form={form} onSubmit={onSubmit}>
      <Grid container spacing={SPACING.form}>
        <InputField
          name="project.name"
          label="Project name"
          placeholder="Type your project name"
          isFullWidth
        />
        <TextareaField
          name="project.description"
          label="Project description"
          placeholder="Type your project description"
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
      </Grid>

      <Grid container spacing={SPACING.form}>
        <InputField
          name="company.name"
          label="Company name"
          placeholder="Type your company name"
          isFullWidth
        />
        <TextareaField
          name="company.description"
          label="Company description"
          placeholder="Type your company description"
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
        <InputField
          name="company.id"
          label="Company ID"
          placeholder="Type your company ID"
          isFullWidth
        />
        <ValuePickerField
          name="company.email"
          label="Company email"
          placeholder="Zadejte email"
          isFullWidth
        />
        <ValuePickerField
          name="company.phone"
          label="Company phone"
          placeholder="Zadejte telefon"
          isFullWidth
        />
        <AddressField fieldPrefix="company.address" />

        {/* TODO */}
        <input type="hidden" {...form.register('company.location')} />

        <InputField
          name="company.bank"
          label="Company bank"
          placeholder="Type your company bank number"
          isFullWidth
        />
      </Grid>

      <div>
        <pre>
          <code>{JSON.stringify(form.watch(), null, 2)}</code>
        </pre>
      </div>
    </ControlledForm>
  );
};

export default SettingsGlobalForm;
