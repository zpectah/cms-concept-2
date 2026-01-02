import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SPACING } from '../../../constants';
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
import { TagsPickerField } from '../../Tags';
import { CategoriesPickerField } from '../../Categories';
import { CommentsManager } from '../../Comments';
import { IArticlesDetailForm } from './types';
import { useArticlesDetailForm } from './useArticlesDetailForm';
import { modelKeys } from '@model';

const ArticlesDetailForm = () => {
  const { t } = useTranslation(['form']);
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
    detailId,
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
            label={t('form:label.name')}
            placeholder={t('form:placeholder.name')}
            layout="vertical"
            isFullWidth
          />
          <SelectField
            name="type"
            label={t('form:label.type')}
            placeholder={t('form:placeholder.type')}
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
                    label={t('form:label.title')}
                    placeholder={t('form:placeholder.title_lang', {
                      lang: loc,
                    })}
                    layout="vertical"
                    isFullWidth
                    isRequired
                  />
                  <TextareaField
                    name={`locale.${loc}.description`}
                    label={t('form:label.description')}
                    placeholder={t('form:placeholder.description_lang', {
                      lang: loc,
                    })}
                    layout="vertical"
                    isFullWidth
                  />
                  <WysiwygField
                    name={`locale.${loc}.content`}
                    label={t('form:label.content')}
                    placeholder={t('form:placeholder.content_lang', {
                      lang: loc,
                    })}
                    layout="vertical"
                    isRequired
                  />
                </Grid>
              )}
            />
          </Grid>

          <TagsPickerField
            name="tags"
            label={t('form:label.tags')}
            placeholder={t('form:placeholder.tags')}
            layout="vertical"
            isMultiple
            isFullWidth
          />
          <CategoriesPickerField
            name="categories"
            label={t('form:label.categories')}
            placeholder={t('form:placeholder.categories')}
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
              fieldLabel={t('form:label.approved')}
              layout="vertical"
            />
            <CheckboxField
              name="explicit"
              label=""
              fieldLabel={t('form:label.explicit')}
              layout="vertical"
            />
            <CheckboxField
              name="active"
              label=""
              fieldLabel={t('form:label.active')}
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
        <CommentsManager
          contentType={modelKeys.articles}
          contentId={detailId}
        />
      </DynamicPortal>
    </>
  );
};

export default ArticlesDetailForm;
