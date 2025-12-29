import { FieldBase, SelectProps } from '../../../../components';

export interface CategoriesPickerProps
  extends Omit<SelectProps, 'items' | 'options'> {
  ignored?: SelectProps['value'][];
}

export interface CategoriesPickerFieldProps extends FieldBase {
  categoriesPickerProps?: Partial<Omit<CategoriesPickerProps, 'multiple'>>;
  isMultiple?: boolean;
}
