import { Grid } from '@mui/material';
import { SPACING } from '../../../constants';
import {
  ControlledForm,
  InputField,
  SelectField,
  TextareaField,
  CheckboxField,
  PasswordField,
  ValuePickerField,
} from '../../../components';
import { useSettingsClientForm } from './useSettingsClientForm';

const SettingsClientForm = () => {
  const { form, onSubmit, options } = useSettingsClientForm();

  return (
    <ControlledForm form={form} onSubmit={onSubmit}>
      <Grid container spacing={SPACING.form}>
        <InputField
          name="meta.title"
          label="Meta title"
          placeholder="Type your app title"
          isFullWidth
        />
        <TextareaField
          name="meta.description"
          label="Meta description"
          placeholder="Type your app description"
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
        <ValuePickerField
          name="meta.keywords"
          label="Meta keywords"
          placeholder="Type your app keywords"
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
        <SelectField
          name="meta.robots"
          label="Meta robots"
          placeholder="Select indexation"
          options={options.metaRobots}
          selectProps={{ sx: { width: '50%' } }}
        />
      </Grid>

      <Grid container spacing={1}>
        <CheckboxField name="state.debug" label="" fieldLabel="Debug mode" />
        <CheckboxField
          name="state.maintenance"
          label=""
          fieldLabel="Maintenance mode"
        />

        <CheckboxField
          name="messages.active"
          label=""
          fieldLabel="Messages active"
        />
        <CheckboxField
          name="comments.active"
          label=""
          fieldLabel="Comments active"
        />
      </Grid>

      <Grid container spacing={SPACING.form}>
        <InputField
          name="email.smtp.host"
          label="SMTP Host name"
          placeholder="Type your SMTP host"
          isFullWidth
        />
        <InputField
          name="email.smtp.port"
          label="SMTP port"
          placeholder="Type your SMTP port"
        />
        <InputField
          name="email.smtp.username"
          label="SMTP Host username"
          placeholder="Type your SMTP username"
          isFullWidth
        />
        <PasswordField
          name="email.smtp.password"
          label="SMTP Host password"
          placeholder="Type your new SMTP password"
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

export default SettingsClientForm;
