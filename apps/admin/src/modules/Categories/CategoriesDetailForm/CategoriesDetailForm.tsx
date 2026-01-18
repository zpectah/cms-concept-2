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
import { CategoriesPickerField } from '../components';
import { ICategoriesDetailForm } from './types';
import { useCategoriesDetailForm } from './useCategoriesDetailForm';

const CategoriesDetailForm = () => {
  const {
    id,
    title,
    form,
    onSubmit,
    onClose,
    onReset,
    onDelete,
    localesTabs,
    options,
    values,
  } = useCategoriesDetailForm();

  return (
    <DetailDrawer<ICategoriesDetailForm>
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
          placeholder="Category name"
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
                <InputField
                  name={`locale.${loc}.title`}
                  label="Title"
                  layout="vertical"
                  placeholder={`Category ${loc} title`}
                  isFullWidth
                  isRequired
                />
                <TextareaField
                  name={`locale.${loc}.description`}
                  label="Description"
                  layout="vertical"
                  placeholder={`Category ${loc} description`}
                  isFullWidth
                />
              </Grid>
            )}
          />
        </Grid>

        <CategoriesPickerField
          name="parent_id"
          label="Parent"
          layout="vertical"
          isFullWidth
          categoriesPickerProps={{
            ignored: [values.id],
          }}
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

export default CategoriesDetailForm;
