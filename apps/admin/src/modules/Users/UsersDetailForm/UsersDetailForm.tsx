import { Grid } from '@mui/material';
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
  const {
    id,
    title,
    form,
    onSubmit,
    onClose,
    onReset,
    onDelete,
    onAvatarUpdate,
    options,
    values,
  } = useUsersDetailForm();

  return (
    <DetailDrawer<IUsersDetailForm>
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
            />
          </Grid>
        </Grid>

        <EmailField
          name="email"
          label="Email"
          layout="vertical"
          placeholder="User email"
          isFullWidth
        />
        <PasswordField
          name="password"
          label="Password"
          layout="vertical"
          placeholder="User password"
          isFullWidth
          isRequired={id === 'new'}
        />
        <SelectField
          name="type"
          label="Type"
          placeholder="Select item type"
          options={options.type}
          layout="vertical"
          selectProps={{ sx: { width: '50%' } }}
        />

        <InputField
          name="first_name"
          label="First name"
          layout="vertical"
          placeholder="Type first name"
          isFullWidth
        />
        <InputField
          name="last_name"
          label="Last name"
          layout="vertical"
          placeholder="Type first name"
          isFullWidth
        />

        <SelectField
          name="access_rights"
          label="Access rights"
          placeholder="Select rules"
          options={options.accessRights}
          layout="vertical"
          selectProps={{ sx: { width: '50%' } }}
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

export default UsersDetailForm;
