import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SPACING } from '../../../constants';
import {
  DetailDrawer,
  LocalesTabs,
  InputField,
  CheckboxField,
  TextareaField,
  WysiwygField,
  SelectField,
} from '../../../components';
import { CategoriesPickerField } from '../../Categories';
import { IPagesDetailForm } from './types';
import { usePagesDetailForm } from './usePagesDetailForm';

const PagesDetailForm = () => {
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
    localesTabs,
    options,
  } = usePagesDetailForm();

  const type = form.watch('type');

  return (
    <DetailDrawer<IPagesDetailForm>
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
          placeholder="Page name"
          isFullWidth
        />
        <SelectField
          name="type"
          label={t('form:label.type')}
          placeholder="Select item type"
          options={options.type}
          layout="vertical"
          selectProps={{ sx: { width: '50%' } }}
        />

        {type === 'category' && (
          <Grid size={12} container>
            <CategoriesPickerField
              name="category_id"
              label={t('form:label.category')}
              layout="vertical"
              isFullWidth
            />
          </Grid>
        )}

        <Grid size={12}>
          <LocalesTabs
            {...localesTabs}
            render={(loc) => (
              <Grid container size={12} spacing={SPACING.form}>
                <InputField
                  name={`locale.${loc}.title`}
                  label={t('form:label.title')}
                  layout="vertical"
                  placeholder={`Page ${loc} title`}
                  isFullWidth
                  isRequired
                />
                <TextareaField
                  name={`locale.${loc}.description`}
                  label={t('form:label.description')}
                  layout="vertical"
                  placeholder={`Page ${loc} description`}
                  isFullWidth
                />
                <WysiwygField
                  name={`locale.${loc}.content`}
                  label={t('form:label.content')}
                  layout="vertical"
                  placeholder={`Page ${loc} content`}
                  isRequired
                />
              </Grid>
            )}
          />
        </Grid>

        <SelectField
          name="meta_robots"
          label={t('form:label.meta_robots')}
          placeholder="Page indexing"
          options={options.metaRobots}
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

export default PagesDetailForm;
