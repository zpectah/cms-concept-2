import { ControlledField } from '../../../../components';
import { MenuItemsPickerFieldProps } from './types';
import MenuItemsPicker from './MenuItemsPicker';

const MenuItemsPickerField = ({
  name,
  label,
  isRequired,
  isDisabled,
  isReadOnly,
  isFullWidth,
  placeholder,
  menuItemsPickerProps,
  isMultiple,
  menuId,
  ignored,
  ...rest
}: MenuItemsPickerFieldProps) => {
  return (
    <ControlledField
      name={name}
      label={label}
      isRequired={isRequired}
      render={(id, field, fieldState) => (
        <MenuItemsPicker
          menuId={menuId}
          ignored={ignored}
          id={id}
          error={!!fieldState.error}
          required={isRequired}
          disabled={isDisabled}
          readOnly={isReadOnly}
          fullWidth={isFullWidth}
          placeholder={placeholder}
          multiple={isMultiple}
          {...menuItemsPickerProps}
          {...field}
        />
      )}
      {...rest}
    />
  );
};

export default MenuItemsPickerField;
