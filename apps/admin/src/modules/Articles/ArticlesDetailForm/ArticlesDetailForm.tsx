import { Grid } from '@mui/material';
import { SPACING } from '../../../constants';
import { TagsPickerField } from '../../Tags';
import { CategoriesPickerField } from '../../Categories';
import {
  DetailDrawer,
  DynamicPortal,
  LocalesTabs,
  InputField,
  CheckboxField,
  TextareaField,
  WysiwygField,
  SelectField,
} from '../../../components';
import { IArticlesDetailForm } from './types';
import { useArticlesDetailForm } from './useArticlesDetailForm';

const ArticlesDetailForm = () => {
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
  } = useArticlesDetailForm();

  const dynamicSlotId = 'articles-comments-portal-target';

  return (
    <>
      <DetailDrawer<IArticlesDetailForm>
        id={id}
        open={!!id}
        defaultTitle={title}
        form={form}
        onClose={onClose}
        onSubmit={onSubmit}
        onReset={onReset}
        onDelete={onDelete}
        keepMounted
      >
        <Grid container spacing={SPACING.form}>
          <InputField
            name="name"
            label="Name"
            layout="vertical"
            placeholder="Article name"
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
                    placeholder={`Article ${loc} title`}
                    isFullWidth
                    isRequired
                  />
                  <TextareaField
                    name={`locale.${loc}.description`}
                    label="Description"
                    layout="vertical"
                    placeholder={`Article ${loc} description`}
                    isFullWidth
                  />
                  <WysiwygField
                    name={`locale.${loc}.content`}
                    label="Content"
                    layout="vertical"
                    placeholder={`Article ${loc} content`}
                    isRequired
                  />
                </Grid>
              )}
            />
          </Grid>

          <TagsPickerField
            name="tags"
            label="Tags"
            layout="vertical"
            isMultiple
            isFullWidth
          />
          <CategoriesPickerField
            name="categories"
            label="Categories"
            layout="vertical"
            isMultiple
            isFullWidth
          />
          {/* TODO */}
          <input type="hidden" {...form.register('files', { value: [] })} />

          <Grid container size={12} spacing={0}>
            <CheckboxField
              name="approved"
              label=""
              fieldLabel="Approved"
              layout="vertical"
            />
            <CheckboxField
              name="explicit"
              label=""
              fieldLabel="Explicit content"
              layout="vertical"
            />
            <CheckboxField
              name="active"
              label=""
              fieldLabel="Active"
              layout="vertical"
            />
          </Grid>

          <Grid container size={12}>
            <div id={dynamicSlotId} />
          </Grid>
        </Grid>
      </DetailDrawer>
      {/* We must render out of the main form due to context conflict */}
      <DynamicPortal targetId={dynamicSlotId}>
        <div>Comments module</div>
      </DynamicPortal>
    </>
  );
};

export default ArticlesDetailForm;
