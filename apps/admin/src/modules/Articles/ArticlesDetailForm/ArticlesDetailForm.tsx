import { Grid } from '@mui/material';
import { SPACING } from '../../../constants';
import {
  DetailDrawer,
  DynamicPortal,
  LocalesTabs,
  InputField,
  CheckboxField,
  TextareaField,
  WysiwygField,
} from '../../../components';
import { IArticlesDetailForm } from './types';
import { useArticlesDetailForm } from './useArticlesDetailForm';

const ArticlesDetailForm = () => {
  const { id, title, form, onSubmit, onClose, onReset, onDelete, localesTabs } =
    useArticlesDetailForm();

  const dynamicSlotId = 'articles-portal-target';

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
      >
        <Grid container spacing={SPACING.form}>
          <InputField
            name="name"
            label="Name"
            layout="vertical"
            placeholder="Article name"
            isFullWidth
          />
          <InputField name="type" label="Type" layout="vertical" isFullWidth />

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
            <CheckboxField
              name="deleted"
              label=""
              fieldLabel="Deleted"
              layout="vertical"
            />

            {/* TODO */}
            <input
              type="hidden"
              {...form.register('categories', { value: [] })}
            />
            <input type="hidden" {...form.register('tags', { value: [] })} />
            <input type="hidden" {...form.register('files', { value: [] })} />
          </Grid>

          <Grid container size={12}>
            <div id={dynamicSlotId} />
          </Grid>

          <Grid size={12}>
            <pre>
              <code>{JSON.stringify(form.watch(), null, 2)}</code>
            </pre>
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
