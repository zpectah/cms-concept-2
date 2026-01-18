import { Grid } from '@mui/material';
import { SPACING } from '../../../constants';
import {
  DetailDrawer,
  InputField,
  CheckboxField,
  SelectField,
  DynamicPortal,
} from '../../../components';
import { MenuItemsManager } from '../../MenuItems';
import { IMenuDetailForm } from './types';
import { useMenuDetailForm } from './useMenuDetailForm';

const MenuDetailForm = () => {
  const {
    id,
    title,
    form,
    onSubmit,
    onClose,
    onReset,
    onDelete,
    options,
    values,
  } = useMenuDetailForm();

  const dynamicSlotId = 'menu-menuitems-portal-target';

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

          <Grid container size={12}>
            <div id={dynamicSlotId} />
          </Grid>
        </Grid>
      </DetailDrawer>
      {/* We must render out of the main form due to context conflict */}
      <DynamicPortal targetId={dynamicSlotId}>
        <MenuItemsManager menuId={values.id} />
      </DynamicPortal>
    </>
  );
};

export default MenuDetailForm;
