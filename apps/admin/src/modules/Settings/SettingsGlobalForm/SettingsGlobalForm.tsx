import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { SPACING } from '../../../constants';
import {
  ControlledForm,
  InputField,
  TextareaField,
  AddressField,
  ValuePickerField,
  LocationPickerField,
  PrimaryButton,
  SecondaryButton,
  GridHeading,
  GridActions,
} from '../../../components';
import { useSettingsGlobalForm } from './useSettingsGlobalForm';

const SettingsGlobalForm = () => {
  const { t } = useTranslation(['common', 'views']);
  const { form, onSubmit, onReset } = useSettingsGlobalForm();

  return (
    <ControlledForm form={form} onSubmit={onSubmit}>
      <Grid container spacing={SPACING.form}>
        <GridHeading title={t('views:settings.global.section.project.title')} />

        <InputField
          name="project.name"
          label={t('views:settings.global.label.projectName')}
          placeholder={t('views:settings.global.placeholder.projectName')}
          isFullWidth
          isRequired
        />
        <TextareaField
          name="project.description"
          label={t('views:settings.global.label.projectDescription')}
          placeholder={t(
            'views:settings.global.placeholder.projectDescription'
          )}
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
        <GridHeading
          title={t('views:settings.global.section.company.title')}
          gridProps={{ sx: { mt: 4 } }}
        />

        <InputField
          name="company.name"
          label={t('views:settings.global.label.companyName')}
          placeholder={t('views:settings.global.placeholder.companyName')}
          isFullWidth
        />
        <TextareaField
          name="company.description"
          label={t('views:settings.global.label.companyDescription')}
          placeholder={t(
            'views:settings.global.placeholder.companyDescription'
          )}
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
          label={t('views:settings.global.label.companyId')}
          placeholder={t('views:settings.global.placeholder.companyId')}
          isFullWidth
        />
        <ValuePickerField
          name="company.email"
          label={t('views:settings.global.label.companyEmail')}
          placeholder={t('views:settings.global.placeholder.companyEmail')}
          isFullWidth
        />
        <ValuePickerField
          name="company.phone"
          label={t('views:settings.global.label.companyPhone')}
          placeholder={t('views:settings.global.placeholder.companyPhone')}
          isFullWidth
        />
        <InputField
          name="company.bank"
          label={t('views:settings.global.label.companyBank')}
          placeholder={t('views:settings.global.placeholder.companyBank')}
          isFullWidth
        />
      </Grid>

      <Grid container spacing={SPACING.form}>
        <GridHeading
          title={t('views:settings.global.section.companyAddress.title')}
          gridProps={{ sx: { mt: 4 } }}
        />

        <AddressField fieldPrefix="company.address" />

        <LocationPickerField
          name="company.location"
          label={t('views:settings.global.label.companyLocation')}
          placeholder={t('views:settings.global.placeholder.companyLocation')}
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

export default SettingsGlobalForm;
