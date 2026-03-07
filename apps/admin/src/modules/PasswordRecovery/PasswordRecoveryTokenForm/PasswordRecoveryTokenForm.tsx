import { useTranslation } from 'react-i18next';
import { Grid, Alert } from '@mui/material';
import { SPACING } from '../../../constants';
import {
  ControlledForm,
  PasswordField,
  GridActions,
  PrimaryButton,
  SecondaryButton,
} from '../../../components';
import { IPasswordRecoveryTokenForm } from './types';
import { passwordRecoveryTokenFormStatusKeys } from './enums';
import { usePasswordRecoveryTokenForm } from './usePasswordRecoveryTokenForm';

const PasswordRecoveryTokenForm = () => {
  const { t } = useTranslation(['common', 'views']);
  const {
    form,
    formId,
    onSubmit,
    onReset,
    processing,
    checking,
    checked,
    redirecting,
    status,
  } = usePasswordRecoveryTokenForm();

  const noRequest = status === passwordRecoveryTokenFormStatusKeys.noRequest;
  const isDisabled =
    processing || checking || !checked || redirecting || noRequest;

  return (
    <ControlledForm<IPasswordRecoveryTokenForm>
      id={formId}
      form={form}
      onSubmit={onSubmit}
      sx={{ width: '100%' }}
    >
      <Grid container spacing={SPACING.form}>
        <input type="hidden" {...form.register('token')} />
        <input type="hidden" {...form.register('email')} />

        {noRequest && (
          <Grid size={{ xs: 12, md: 8 }} offset={{ md: 2 }} sx={{ pb: 2 }}>
            <Alert variant="filled" severity="error">
              {t('views:passwordRecovery.messages.error.noRequest')}
            </Alert>
          </Grid>
        )}

        <PasswordField
          name="password"
          label={t('views:passwordRecovery.form.label.password')}
          placeholder={t('views:passwordRecovery.form.placeholder.password')}
          layout="vertical"
          isFullWidth
          isRequired
          isDisabled={noRequest}
          size={{ xs: 12, md: 8 }}
          gridProps={{ offset: { md: 2 } }}
        />

        <GridActions
          disableSeparator
          stackProps={{
            justifyContent: 'center',
          }}
        >
          <SecondaryButton onClick={onReset} size="large" disabled={isDisabled}>
            {t('button.reset')}
          </SecondaryButton>
          <PrimaryButton type="submit" size="large" disabled={isDisabled}>
            {t('button.submit')}
          </PrimaryButton>
        </GridActions>
      </Grid>
    </ControlledForm>
  );
};

export default PasswordRecoveryTokenForm;
