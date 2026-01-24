import { Grid } from '@mui/material';
import { SPACING } from '../../../constants';
import {
  DetailDrawer,
  InputField,
  CheckboxField,
  SelectField,
} from '../../../components';
import { MenuItemsManager } from '../../MenuItems';
import { IMenuDetailForm } from './types';
import { useMenuDetailForm } from './useMenuDetailForm';

const MenuDetailForm = () => {
  const {
    id,
    title,
    formId,
    form,
    onSubmit,
    onClose,
    onReset,
    onDelete,
    options,
    values,
  } = useMenuDetailForm();

  return (
    <>
      <DetailDrawer<IMenuDetailForm>
        id={id}
        open={!!id}
        defaultTitle={title}
        form={form}
        onClose={onClose}
        onSubmit={onSubmit}
        onReset={onReset}
        onDelete={onDelete}
        formId={formId}
        externalSlot={
          <MenuItemsManager
            key={values.updated}
            menuId={values.id}
            menuPrefix={values.uid}
          />
        }
        keepMounted
      >
        <Grid container spacing={SPACING.form}>
          <InputField
            name="name"
            label="Name"
            layout="vertical"
            placeholder="Menu name"
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
    </>
  );
};

export default MenuDetailForm;
