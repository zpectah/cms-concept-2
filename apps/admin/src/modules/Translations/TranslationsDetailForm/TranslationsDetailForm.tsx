import { Grid } from '@mui/material';
import { SPACING } from '../../../constants';
import {
  DetailDrawer,
  LocalesTabs,
  InputField,
  CheckboxField,
  TextareaField,
  SelectField,
} from '../../../components';
import { ITranslationsDetailForm } from './types';
import { useTranslationsDetailForm } from './useTranslationsDetailForm';

const TranslationsDetailForm = () => {
  const {
    id,
    title,
    form,
    onSubmit,
    onClose,
    onReset,
    onDelete,
    options,
    localesTabs,
  } = useTranslationsDetailForm();

  return (
    <DetailDrawer<ITranslationsDetailForm>
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
          label="Name"
          layout="vertical"
          placeholder="Translation name"
          isFullWidth
        />
        <SelectField
          name="type"
          label="Type"
          placeholder="Select item type"
          options={options.type}
          layout="vertical"
          selectProps={{ sx: { width: '50%' } }}
        />

        <Grid size={12}>
          <LocalesTabs
            {...localesTabs}
            render={(loc) => (
              <Grid container size={12} spacing={SPACING.form}>
                <TextareaField
                  name={`locale.${loc}.value`}
                  label="Value"
                  layout="vertical"
                  placeholder={`Translation ${loc} value`}
                  isFullWidth
                  textareaProps={{ rows: 2 }}
                />
              </Grid>
            )}
          />
        </Grid>

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

export default TranslationsDetailForm;
