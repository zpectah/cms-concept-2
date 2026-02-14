import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SPACING } from '../../../constants';
import { DetailDrawer, Literal, TypeValue } from '../../../components';
import { IMessagesDetailForm } from './types';
import { useMessagesDetailForm } from './useMessagesDetailForm';

const MessagesDetailForm = () => {
  const { t } = useTranslation(['form']);
  const { id, title, form, onClose, onDelete, customActions, values } =
    useMessagesDetailForm();

  return (
    <DetailDrawer<IMessagesDetailForm>
      id={id}
      open={!!id}
      defaultTitle={title}
      form={form}
      onClose={onClose}
      onDelete={onDelete}
      actions={customActions}
    >
      <Grid container spacing={SPACING.form}>
        <Literal
          label={t('form:label.type')}
          value={<TypeValue value={values.type} prefix="model" />}
          layout="vertical"
        />
        <Literal
          label={t('form:label.sender')}
          value={values.sender}
          layout="vertical"
        />
        <Literal
          label={t('form:label.subject')}
          value={values.subject}
          layout="vertical"
        />
        <Literal
          label={t('form:label.content')}
          value={values.content}
          layout="vertical"
        />
      </Grid>
    </DetailDrawer>
  );
};

export default MessagesDetailForm;
