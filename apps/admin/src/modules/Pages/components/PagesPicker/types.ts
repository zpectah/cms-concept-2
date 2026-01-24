import { FieldBase, SelectProps } from '../../../../components';

export interface PagesPickerProps
  extends Omit<SelectProps, 'items' | 'options'> {
  ignored?: SelectProps['value'][];
}

export interface PagesPickerFieldProps extends FieldBase {
  pagesPickerProps?: Partial<Omit<PagesPickerProps, 'multiple'>>;
  isMultiple?: boolean;
}
