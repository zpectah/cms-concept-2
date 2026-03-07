import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { getConfig } from '../../../config';
import { SPACING } from '../../../constants';
import {
  ControlledForm,
  EmailField,
  PasswordField,
  PrimaryButton,
  SecondaryButton,
  GridActions,
  LinkButton,
} from '../../../components';
import { ILoginForm } from './types';
import { useLoginForm } from './useLoginForm';

const LoginForm = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['common', 'views']);
  const { form, processing, onSubmit, onReset, meta } = useLoginForm();

  return (
    <ControlledForm<ILoginForm>
      form={form}
      onSubmit={onSubmit}
      sx={{ width: '100%' }}
    >
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
          isRequired
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
          isRequired
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
        <Grid size={{ xs: 12, md: 6 }} offset={{ md: 3 }} sx={{ pt: 1 }}>
          <LinkButton to={routes.passwordRecovery.root}>
            Password recovery
          </LinkButton>
        </Grid>
      </Grid>
    </ControlledForm>
  );
};

export default LoginForm;
