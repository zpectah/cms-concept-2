import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SPACING } from '../../../constants';
import {
  DetailDrawer,
  InputField,
  EmailField,
  PasswordField,
  CheckboxField,
  SelectField,
  AddressField,
  TextareaField,
  DatePickerField,
  AvatarUploader,
} from '../../../components';
import { IMembersDetailForm } from './types';
import { useMembersDetailForm } from './useMembersDetailForm';

const MembersDetailForm = () => {
  const { t } = useTranslation(['form']);
  const {
    id,
    title,
    form,
    formId,
    onSubmit,
    onClose,
    onReset,
    onDelete,
    onAvatarUpdate,
    options,
    values,
  } = useMembersDetailForm();

  return (
    <DetailDrawer<IMembersDetailForm>
      formId={formId}
      id={id}
      open={!!id}
      defaultTitle={title}
      form={form}
      onClose={onClose}
      onSubmit={onSubmit}
      onReset={onReset}
      onDelete={onDelete}
    >
      <Grid container spacing={SPACING.form}>
        <Grid size={12} container spacing={SPACING.form}>
          <Grid
            size={{ xs: 12, md: 6 }}
            offset={{ xs: 0, md: 3 }}
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <AvatarUploader
              filename={values.avatar}
              memberUid={values.uid}
              onComplete={onAvatarUpdate}
              onClear={() => onAvatarUpdate('')}
              size={'175px'}
            />
          </Grid>
        </Grid>

        <EmailField
          name="email"
          label={t('form:label.email')}
          layout="vertical"
          placeholder="Member email"
          isFullWidth
        />
        <PasswordField
          name="password"
          label={t('form:label.password')}
          layout="vertical"
          placeholder="Member password"
          isFullWidth
        />
        <SelectField
          name="type"
          label={t('form:label.type')}
          placeholder="Select item type"
          options={options.type}
          layout="vertical"
          selectProps={{ sx: { width: '50%' } }}
        />

        <InputField
          name="first_name"
          label={t('form:label.first_name')}
          layout="vertical"
          placeholder="Type first name"
          isFullWidth
        />
        <InputField
          name="last_name"
          label={t('form:label.last_name')}
          layout="vertical"
          placeholder="Type first name"
          isFullWidth
        />

        <SelectField
          name="sex"
          label={t('form:label.sex')}
          placeholder="Select sex"
          options={options.sex}
          layout="vertical"
          selectProps={{ sx: { width: '50%' } }}
        />

        <AddressField
          fieldPrefix="address"
          fieldCommonProps={{
            layout: 'vertical',
          }}
        />

        <InputField
          name="flat_no"
          label={t('form:label.flat_number')}
          placeholder="Flat number"
          layout="vertical"
        />

        <DatePickerField
          name="birthdate"
          label={t('form:label.birthdate')}
          layout="vertical"
          isFullWidth
        />

        <TextareaField
          name="description"
          label={t('form:label.description')}
          layout="vertical"
          placeholder="Member description"
          isFullWidth
        />

        <Grid container size={12} spacing={0}>
          <CheckboxField
            name="active"
            label=""
            fieldLabel="Active"
            layout="vertical"
          />
        </Grid>
      </Grid>
    </DetailDrawer>
  );
};

export default MembersDetailForm;
