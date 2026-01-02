import { Grid } from '@mui/material';
import { SPACING } from '../../../constants';
import { DetailDrawer, InputField, TextareaField } from '../../../components';
import { IMessagesDetailForm } from './types';
import { useMessagesDetailForm } from './useMessagesDetailForm';

const MessagesDetailForm = () => {
  const { id, title, form, onClose, onDelete, customActions } =
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
        <InputField
          name="sender"
          label="Sender"
          layout="vertical"
          isFullWidth
          isReadOnly
        />
        <InputField
          name="type"
          label="Type"
          layout="vertical"
          isFullWidth
          isReadOnly
        />
        <InputField
          name="subject"
          label="Subject"
          layout="vertical"
          isFullWidth
          isReadOnly
        />
        <TextareaField
          name="content"
          label="Content"
          layout="vertical"
          isFullWidth
          isReadOnly
        />
      </Grid>
    </DetailDrawer>
  );
};

export default MessagesDetailForm;
