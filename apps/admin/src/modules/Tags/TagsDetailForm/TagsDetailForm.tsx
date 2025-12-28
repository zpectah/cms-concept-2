import { Grid } from '@mui/material';
import { SPACING } from '../../../constants';
import { DetailDrawer, InputField, CheckboxField } from '../../../components';
import { ITagsDetailForm } from './types';
import { useTagsDetailForm } from './useTagsDetailForm';

const TagsDetailForm = () => {
  const { id, title, form, onSubmit, onClose, onReset, onDelete } =
    useTagsDetailForm();

  return (
    <DetailDrawer<ITagsDetailForm>
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
          placeholder="Tag name"
          isFullWidth
        />
        <InputField name="type" label="Type" layout="vertical" isFullWidth />
        <InputField name="color" label="Color" layout="vertical" isFullWidth />

        <Grid container size={12} spacing={0}>
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
        </Grid>
      </Grid>
    </DetailDrawer>
  );
};

export default TagsDetailForm;
