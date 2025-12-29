import { FieldBase, SelectProps } from '../../../../components';

export interface TagsPickerProps
  extends Omit<SelectProps, 'items' | 'options'> {
  ignored?: SelectProps['value'][];
}

export interface TagsPickerFieldProps extends FieldBase {
  tagsPickerProps?: Partial<Omit<TagsPickerProps, 'multiple'>>;
  isMultiple?: boolean;
}
