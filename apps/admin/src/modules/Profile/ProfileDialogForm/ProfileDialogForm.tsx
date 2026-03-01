import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { useAppStore } from '../../../store';
import { PROFILE_DRAWER_WIDTH_DEFAULT, SPACING } from '../../../constants';
import { usePersonData } from '../../../hooks';
import { getOptionValue } from '../../../helpers';
import {
  Button,
  Drawer,
  ControlledForm,
  EmailField,
  PasswordField,
  InputField,
  AvatarUploader,
  PrimaryButton,
  SecondaryButton,
  Literal,
} from '../../../components';
import { useProfileDialogForm } from './useProfileDialogForm';

const ProfileDialogForm = () => {
  const { t } = useTranslation(['common']);
  const { profileDialog, setProfileDialog } = useAppStore();
  const {
    form,
    formId,
    profileData,
    onSubmit,
    onReset,
    onAvatarUpdate,
    values,
  } = useProfileDialogForm();
  const { getPersonName, getUserAccessLabelByKey } = usePersonData();

  return (
    <Drawer
      labelId="profile-dialog"
      anchor="right"
      open={profileDialog}
      onClose={() => setProfileDialog(false)}
      title={getPersonName({
        firstName: profileData?.first_name,
        lastName: profileData?.last_name,
        email: profileData?.email ?? '',
      })}
      actions={
        <>
          <SecondaryButton onClick={() => setProfileDialog(false)}>
            {t('button.cancel')}
          </SecondaryButton>
          <Button
            variant="outlined"
            color="warning"
            onClick={onReset}
            disabled={!form.formState.isDirty}
          >
            {t('button.reset')}
          </Button>
          <PrimaryButton type="submit" form={formId}>
            {t('button.updateChanges')}
          </PrimaryButton>
        </>
      }
      width={{
        xs: '100%',
        md: PROFILE_DRAWER_WIDTH_DEFAULT,
      }}
    >
      <ControlledForm id={formId} form={form} onSubmit={onSubmit}>
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
                userUid={profileData?.uid}
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
            isFullWidth
            isReadOnly
          />
          <PasswordField
            name="password"
            label="New password"
            placeholder="Type password to change"
            layout="vertical"
            isFullWidth
          />
          <InputField
            name="first_name"
            label="First name"
            layout="vertical"
            isFullWidth
          />
          <InputField
            name="last_name"
            label="Last name"
            layout="vertical"
            isFullWidth
          />

          <Literal
            label="Type"
            value={getOptionValue(profileData?.type ?? '', 'model')}
          />
          <Literal
            label="Access rights"
            value={getUserAccessLabelByKey(profileData?.access_rights)}
          />
        </Grid>
      </ControlledForm>
    </Drawer>
  );
};

export default ProfileDialogForm;
