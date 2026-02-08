import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import {
  Button,
  Dialog,
  ControlledForm,
  InputField,
  CheckboxField,
  EmailField,
  TextareaField,
} from '../../../../../components';
import { SPACING } from '../../../../../constants';
import { useCommentsManagerDetailForm } from './useCommentsManagerDetailForm';

const CommentsManagerDetail = () => {
  const { t } = useTranslation(['common', 'form']);
  const {
    open,
    setOpen,
    formId,
    detailId,
    detailTitle,
    form,
    onSubmit,
    onReset,
    onDelete,
  } = useCommentsManagerDetailForm();

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="sm"
      fullWidth
      title={detailTitle}
      content={
        <ControlledForm form={form} onSubmit={onSubmit} id={formId}>
          <Grid container spacing={SPACING.form}>
            <EmailField
              name="sender"
              label={t('form:label.sender')}
              layout="vertical"
              placeholder="Select sender"
              isFullWidth
              isRequired
              isReadOnly
            />
            <InputField
              name="subject"
              label={t('form:label.subject')}
              layout="vertical"
              placeholder="Type subject"
              isFullWidth
              isRequired
            />
            <TextareaField
              name="content"
              label={t('form:label.content')}
              layout="vertical"
              placeholder="Type content"
              isFullWidth
              isRequired
            />
            <Grid container size={12} spacing={0}>
              <CheckboxField
                name="reported"
                label=""
                fieldLabel={t('form:label.reported')}
                layout="vertical"
                isDisabled={detailId === 'new'}
              />
              <CheckboxField
                name="active"
                label=""
                fieldLabel={t('form:label.active')}
                layout="vertical"
              />
            </Grid>
          </Grid>
        </ControlledForm>
      }
      actions={
        <>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            {t('button.cancel')}
          </Button>
          <Button variant="outlined" color="warning" onClick={onReset}>
            {t('button.reset')}
          </Button>
          {detailId !== 'new' && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(detailId ?? 0)}
            >
              {t('button.delete')}
            </Button>
          )}
          <Button type="submit" variant="contained" form={formId}>
            {detailId === 'new' ? t('button.create') : t('button.update')}
          </Button>
        </>
      }
    />
  );
};

export default CommentsManagerDetail;
