import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { articlesTypeKeys, modelKeys } from '@model';
import { SPACING } from '../../../constants';
import {
  DetailDrawer,
  LocalesTabs,
  InputField,
  CheckboxField,
  TextareaField,
  WysiwygField,
  SelectField,
  DateTimePickerField,
  AddressField,
  LocationPickerField,
} from '../../../components';
import { FilesPickerField } from '../../Files';
import { TagsPickerField } from '../../Tags';
import { CategoriesPickerField } from '../../Categories';
import { CommentsManager } from '../../Comments';
import { IArticlesDetailForm } from './types';
import { useArticlesDetailForm } from './useArticlesDetailForm';

const ArticlesDetailForm = () => {
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
    values,
  } = useArticlesDetailForm();

  return (
    <>
      <DetailDrawer<IArticlesDetailForm>
        formId={formId}
        id={id}
        open={!!id}
        defaultTitle={title}
        form={form}
        onClose={onClose}
        onSubmit={onSubmit}
        onReset={onReset}
        onDelete={onDelete}
        externalSlot={
          <CommentsManager
            contentType={modelKeys.articles}
            contentId={values.id}
          />
        }
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
          {values.type === articlesTypeKeys.event && (
            <>
              <Grid container size={12} spacing={SPACING.form}>
                <DateTimePickerField
                  name="event_start"
                  label={t('form:label.event_start')}
                  layout="vertical"
                  isFullWidth
                  size={6}
                />
                <DateTimePickerField
                  name="event_end"
                  label={t('form:label.event_end')}
                  layout="vertical"
                  isFullWidth
                  size={6}
                  dateTimePickerProps={{ minDate: values.minDate }}
                />
              </Grid>
              <AddressField
                fieldPrefix={'event_address'}
                fieldCommonProps={{
                  layout: 'vertical',
                }}
              />
              <LocationPickerField
                name="event_location"
                label={t('form:label.event_location')}
                isFullWidth
                layout="vertical"
              />
            </>
          )}
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
          <FilesPickerField
            name="image_thumb_id"
            label="Thumbnail"
            placeholder="Pick thumbnail"
            layout="vertical"
            fileType="image"
          />
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
          <FilesPickerField
            name="attachments"
            label="Attachments"
            placeholder="Pick attachments"
            layout="vertical"
            isMultiple
          />
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
        </Grid>
      </DetailDrawer>
    </>
  );
};

export default ArticlesDetailForm;
