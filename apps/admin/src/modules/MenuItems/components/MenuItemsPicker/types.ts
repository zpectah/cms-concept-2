import { FieldBase, SelectProps } from '../../../../components';

export interface MenuItemsPickerProps
  extends Omit<SelectProps, 'items' | 'options'> {
  menuId: number;
  ignored?: SelectProps['value'][];
}

export interface MenuItemsPickerFieldProps extends FieldBase {
  menuId: number;
  ignored?: SelectProps['value'][];
  menuItemsPickerProps?: Partial<
    Omit<MenuItemsPickerProps, 'multiple' | 'menuId' | 'ignored'>
  >;
  isMultiple?: boolean;
}
