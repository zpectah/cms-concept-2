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
  AvatarUploader,
} from '../../../components';
import { IUsersDetailForm } from './types';
import { useUsersDetailForm } from './useUsersDetailForm';

const UsersDetailForm = () => {
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
  } = useUsersDetailForm();

  const isNew = id === 'new';

  return (
    <DetailDrawer<IUsersDetailForm>
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
              userUid={values.uid}
              onComplete={onAvatarUpdate}
              onClear={() => onAvatarUpdate('')}
              size={'175px'}
              disabled={isNew}
            />
          </Grid>
        </Grid>

        <EmailField
          name="email"
          label={t('form:label.email')}
          layout="vertical"
          placeholder="User email"
          isFullWidth
        />
        <PasswordField
          name="password"
          label={t('form:label.password')}
          layout="vertical"
          placeholder={isNew ? 'User password' : 'New password'}
          isFullWidth
          isRequired={isNew}
        />

        <SelectField
          name="type"
          label={t('form:label.type')}
          placeholder="Select item type"
          options={options.type}
          layout="vertical"
          selectProps={{ sx: { width: '50%' } }}
        />
        <SelectField
          name="access_rights"
          label={t('form:label.access_rights')}
          placeholder="Select rules"
          options={options.accessRights}
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

        <Grid container size={12} spacing={0}>
          <CheckboxField
            name="active"
            label=""
            fieldLabel={t('form:label.active')}
            layout="vertical"
          />
        </Grid>
      </Grid>
    </DetailDrawer>
  );
};

export default UsersDetailForm;
