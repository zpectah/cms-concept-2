import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Alert, AlertProps } from '@mui/material';
import { SPACING } from '../../../constants';
import {
  ControlledForm,
  EmailField,
  GridActions,
  PrimaryButton,
  SecondaryButton,
} from '../../../components';
import { IPasswordRecoveryForm } from './types';
import { passwordRecoveryFormStatusKeys } from './enums';
import { usePasswordRecoveryForm } from './usePasswordRecoveryForm';

const PasswordRecoveryForm = () => {
  const { t } = useTranslation(['common', 'views']);
  const { form, formId, onSubmit, onReset, processing, status } =
    usePasswordRecoveryForm();

  const renderMessage = useMemo(() => {
    if (!status) return null;

    const statusConfig: Record<
      string,
      { color: AlertProps['color']; msg: string }
    > = {
      [passwordRecoveryFormStatusKeys.emailSend]: {
        color: 'success',
        msg: 'emailSend',
      },
      [passwordRecoveryFormStatusKeys.noEmail]: {
        color: 'warning',
        msg: 'noEmail',
      },
      [passwordRecoveryFormStatusKeys.noRequestCreated]: {
        color: 'error',
        msg: 'noRequestCreated',
      },
      [passwordRecoveryFormStatusKeys.noTokenCreated]: {
        color: 'error',
        msg: 'noTokenCreated',
      },
      [passwordRecoveryFormStatusKeys.noEmailCreated]: {
        color: 'error',
        msg: 'noEmailCreated',
      },
      [passwordRecoveryFormStatusKeys.noEmailSend]: {
        color: 'error',
        msg: 'noEmailSend',
      },
    };

    const config = statusConfig[status];

    if (!config) return null;

    return (
      <Alert variant="filled" color={config.color}>
        {t(`views:passwordRecovery.messages.${config.color}.${config.msg}`)}
      </Alert>
    );
  }, [t, status]);

  return (
    <ControlledForm<IPasswordRecoveryForm>
      id={formId}
      form={form}
      onSubmit={onSubmit}
      sx={{ width: '100%' }}
    >
      <Grid container spacing={SPACING.form}>
        {status && (
          <Grid
            size={{ xs: 12, md: 8 }}
            offset={{ md: 2 }}
            sx={{ pb: 2, textAlign: 'left' }}
          >
            {renderMessage}
          </Grid>
        )}

        <EmailField
          name="email"
          label={t('views:passwordRecovery.form.label.email')}
          placeholder={t('views:passwordRecovery.form.placeholder.email')}
          layout="vertical"
          isFullWidth
          isRequired
          size={{ xs: 12, md: 8 }}
          gridProps={{ offset: { md: 2 } }}
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

export default PasswordRecoveryForm;
