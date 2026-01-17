import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import {
  Button,
  Dialog,
  ControlledForm,
  InputField,
  SelectField,
  EmailField,
  CheckboxField,
} from '../../../../components';
import { useSettingsBlacklistContext } from '../SettingsBlacklist.context';
import { useSettingsBlacklistDetailForm } from './useSettingsBlacklistDetailForm';

const SettingsBlacklistDetailForm = () => {
  const { t } = useTranslation(['common', 'views', 'form']);
  const { detail } = useSettingsBlacklistContext();
  const {
    open,
    setOpen,
    form,
    onSubmit,
    onReset,
    onDelete,
    options,
    isUpdate,
  } = useSettingsBlacklistDetailForm();

  const formId = 'settingsBlacklistDetailForm';

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        title={
          detail === 'new'
            ? t('views:settings.blacklist.dialog.title.create')
            : t('views:settings.blacklist.dialog.title.update')
        }
        actions={
          <>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              {t('common:button.cancel')}
            </Button>
            {isUpdate && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => onDelete(detail as number)}
              >
                {t('common:button.delete')}
              </Button>
            )}
            <Button variant="outlined" color="warning" onClick={onReset}>
              {t('common:button.reset')}
            </Button>
            <Button type="submit" form={formId} variant="contained">
              {detail === 'new'
                ? t('common:button.create')
                : t('common:button.update')}
            </Button>
          </>
        }
        content={
          <ControlledForm id={formId} form={form} onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <SelectField
                name="type"
                label={t('form:label.type')}
                placeholder={t('form:placeholder.type')}
                options={options.type}
                layout="vertical"
                selectProps={{ sx: { width: '50%' } }}
              />
              <EmailField
                name="email"
                label={t('views:settings.blacklist.form.label.email')}
                layout="vertical"
                placeholder={t(
                  'views:settings.blacklist.form.placeholder.email'
                )}
                isFullWidth
              />
              <InputField
                name="ipaddress"
                label={t('views:settings.blacklist.form.label.ipaddress')}
                layout="vertical"
                placeholder={t(
                  'views:settings.blacklist.form.placeholder.ipaddress'
                )}
                isFullWidth
              />
              <Grid container size={12} spacing={0}>
                <CheckboxField
                  name="active"
                  label=""
                  fieldLabel={t('form:label.active')}
                  layout="vertical"
                />
                <CheckboxField
                  name="deleted"
                  label=""
                  fieldLabel={t('form:label.deleted')}
                  layout="vertical"
                />
              </Grid>
            </Grid>
          </ControlledForm>
        }
      />
    </>
  );
};

export default SettingsBlacklistDetailForm;
