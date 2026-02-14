import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SPACING } from '../../../constants';
import {
  DetailDrawer,
  InputField,
  CheckboxField,
  SelectField,
} from '../../../components';
import { ICustomFieldsDetailForm } from './types';
import { useCustomFieldsDetailForm } from './useCustomFieldsDetailForm';

const CustomFieldsDetailForm = () => {
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
    options,
  } = useCustomFieldsDetailForm();

  return (
    <DetailDrawer<ICustomFieldsDetailForm>
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
        <InputField
          name="name"
          label={t('form:label.name')}
          layout="vertical"
          placeholder="Custom field name"
          isFullWidth
        />
        <SelectField
          name="type"
          label={t('form:label.type')}
          placeholder="Select custom field type"
          options={options.type}
          layout="vertical"
          selectProps={{ sx: { width: '50%' } }}
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

export default CustomFieldsDetailForm;
