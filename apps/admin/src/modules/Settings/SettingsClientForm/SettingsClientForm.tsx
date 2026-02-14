import { useTranslation } from 'react-i18next';
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
  GridHeading,
  GridActions,
  SecondaryButton,
  PrimaryButton,
} from '../../../components';
import { useSettingsClientForm } from './useSettingsClientForm';

const SettingsClientForm = () => {
  const { t } = useTranslation(['common', 'views']);
  const { form, onSubmit, onReset, options } = useSettingsClientForm();

  return (
    <ControlledForm form={form} onSubmit={onSubmit}>
      <Grid container spacing={SPACING.form}>
        <GridHeading title={t('views:settings.client.section.meta.title')} />

        <InputField
          name="meta.title"
          label={t('views:settings.client.label.metaTitle')}
          placeholder={t('views:settings.client.placeholder.metaTitle')}
          isFullWidth
          isRequired
        />
        <TextareaField
          name="meta.description"
          label={t('views:settings.client.label.metaDescription')}
          placeholder={t('views:settings.client.placeholder.metaDescription')}
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
          label={t('views:settings.client.label.metaKeywords')}
          placeholder={t('views:settings.client.placeholder.metaKeywords')}
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
          label={t('views:settings.client.label.metaRobots')}
          placeholder={t('views:settings.client.placeholder.metaRobots')}
          options={options.metaRobots}
          selectProps={{ sx: { width: '50%' } }}
        />
      </Grid>

      <Grid container spacing={SPACING.form}>
        <GridHeading
          title={t('views:settings.client.section.emailServer.title')}
          gridProps={{ sx: { mt: 4 } }}
        />

        <InputField
          name="email.smtp.host"
          label={t('views:settings.client.label.emailHostName')}
          placeholder={t('views:settings.client.placeholder.emailHostName')}
          isFullWidth
          isRequired
        />
        <InputField
          name="email.smtp.username"
          label={t('views:settings.client.label.emailHostUsername')}
          placeholder={t('views:settings.client.placeholder.emailHostUsername')}
          isFullWidth
          isRequired
        />
        <InputField
          name="email.smtp.port"
          label={t('views:settings.client.label.emailHostPort')}
          placeholder={t('views:settings.client.placeholder.emailHostPort')}
          isRequired
        />
        <PasswordField
          name="email.smtp.password"
          label={t('views:settings.client.label.emailHostPassword')}
          placeholder={t('views:settings.client.placeholder.emailHostPassword')}
          helpers={[t('views:settings.client.helpers.emailHostPassword')]}
          isFullWidth
        />
      </Grid>

      <Grid container spacing={SPACING.form}>
        <GridHeading
          title={t('views:settings.client.section.feedback.title')}
          gridProps={{ sx: { mt: 4 } }}
        />

        <CheckboxField
          name="messages.active"
          fieldLabel={t('views:settings.client.label.messagesActive')}
          label=""
        />
        <CheckboxField
          name="comments.active"
          fieldLabel={t('views:settings.client.label.commentsActive')}
          label=""
        />
      </Grid>

      <Grid container spacing={SPACING.form}>
        <GridHeading
          title={t('views:settings.client.section.states.title')}
          gridProps={{ sx: { mt: 4 } }}
        />

        <CheckboxField
          name="state.debug"
          fieldLabel={t('views:settings.client.label.debugMode')}
          label=""
        />
        <CheckboxField
          name="state.maintenance"
          fieldLabel={t('views:settings.client.label.maintenanceMode')}
          label=""
        />
      </Grid>

      <Grid container spacing={SPACING.form} sx={{ mt: 4 }}>
        <GridActions>
          <SecondaryButton onClick={onReset}>
            {t('button.reset')}
          </SecondaryButton>
          <PrimaryButton type="submit">{t('button.update')}</PrimaryButton>
        </GridActions>
      </Grid>
    </ControlledForm>
  );
};

export default SettingsClientForm;
