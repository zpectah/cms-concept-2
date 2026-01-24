import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import {
  Button,
  Dialog,
  ControlledForm,
  SelectField,
  LocalesTabs,
  InputField,
  CheckboxField,
  NumberAltField,
} from '../../../../../components';
import { SPACING } from '../../../../../constants';
import { PagesPickerField } from '../../../../Pages';
import { MenuItemsPickerField } from '../../MenuItemsPicker';
import { useMenuItemsManagerContext } from '../MenuItemsManager.context';
import { useMenuItemsManagerDetailForm } from './useMenuItemsManagerDetailForm';

const MenuItemsManagerDetail = () => {
  const { t } = useTranslation(['common', 'form']);
  const { menuId } = useMenuItemsManagerContext();
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
    options,
    localesTabs,
    values,
  } = useMenuItemsManagerDetailForm();

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
            <InputField
              name="name"
              label="Name"
              layout="vertical"
              placeholder="Menu name"
              isFullWidth
              isRequired
            />

            <SelectField
              name="type"
              label={t('form:label.type')}
              placeholder={t('form:placeholder.type')}
              options={options.type}
              layout="vertical"
              isFullWidth
              size={{
                xs: 12,
                sm: 6,
              }}
            />

            <NumberAltField
              name="item_order"
              label="Order"
              layout="vertical"
              isFullWidth
              size={{
                xs: 12,
                sm: 6,
              }}
            />

            {values.type === 'page' && (
              <PagesPickerField
                name="link_page"
                label="Page ID"
                layout="vertical"
                isFullWidth
                isRequired={values.type === 'page'}
              />
            )}

            {values.type === 'link' && (
              <InputField
                name={`link_url`}
                label="Link url"
                layout="vertical"
                placeholder={`http://`}
                isFullWidth
                isRequired={values.type === 'link'}
              />
            )}

            <MenuItemsPickerField
              name="parent_id"
              label="Parent"
              layout="vertical"
              isFullWidth
              menuId={menuId ?? 0}
              ignored={[detailId]}
            />

            <Grid size={12}>
              <LocalesTabs
                {...localesTabs}
                render={(loc) => (
                  <Grid container size={12} spacing={SPACING.form}>
                    <InputField
                      name={`locale.${loc}.label`}
                      label="Label"
                      layout="vertical"
                      placeholder={`Item ${loc} label`}
                      isFullWidth
                      isRequired
                    />
                  </Grid>
                )}
              />
            </Grid>

            <Grid container size={12} spacing={0}>
              <CheckboxField
                name="active"
                label=""
                fieldLabel="Active"
                layout="vertical"
              />
            </Grid>
          </Grid>
        </ControlledForm>
      }
      actions={
        <>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="outlined" color="warning" onClick={onReset}>
            Reset
          </Button>
          {detailId !== 'new' && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => onDelete(detailId ?? 0)}
            >
              Delete
            </Button>
          )}
          <Button type="submit" variant="contained" form={formId}>
            Submit
          </Button>
        </>
      }
    />
  );
};

export default MenuItemsManagerDetail;
