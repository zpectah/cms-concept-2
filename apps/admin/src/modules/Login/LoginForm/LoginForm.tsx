import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { SPACING } from '../../../constants';
import {
  ControlledForm,
  EmailField,
  PasswordField,
  PrimaryButton,
  SecondaryButton,
  GridActions,
} from '../../../components';
import { ILoginForm } from './types';
import { useLoginForm } from './useLoginForm';

const LoginForm = () => {
  const { t } = useTranslation(['common', 'views']);
  const { form, processing, onSubmit, onReset, meta } = useLoginForm();

  return (
    <ControlledForm<ILoginForm> form={form} onSubmit={onSubmit}>
      <Grid container spacing={SPACING.form}>
        <Grid size={12}>
          <Typography variant="h5">{meta.projectName}</Typography>
        </Grid>
        <EmailField
          name="email"
          label={t('views:login.form.label.email')}
          placeholder={t('views:login.form.placeholder.email')}
          layout="vertical"
          isFullWidth
          size={{ xs: 12, md: 8 }}
          gridProps={{ offset: { md: 2 } }}
          isDisabled={processing}
        />
        <PasswordField
          name="password"
          label={t('views:login.form.label.password')}
          placeholder={t('views:login.form.placeholder.password')}
          layout="vertical"
          isFullWidth
          size={{ xs: 12, md: 8 }}
          gridProps={{ offset: { md: 2 } }}
          isDisabled={processing}
        />
        <GridActions
          disableSeparator
          stackProps={{
            justifyContent: 'center',
          }}
        >
          <SecondaryButton onClick={onReset} size="large" disabled={processing}>
            {t('button.reset')}
          </SecondaryButton>
          <PrimaryButton type="submit" size="large" disabled={processing}>
            {t('button.submit')}
          </PrimaryButton>
        </GridActions>
      </Grid>
    </ControlledForm>
  );
};

export default LoginForm;
