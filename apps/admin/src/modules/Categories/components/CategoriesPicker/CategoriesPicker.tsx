import { forwardRef } from 'react';
import { CategoriesPickerProps } from './types';

const CategoriesPicker = forwardRef<HTMLInputElement, CategoriesPickerProps>(
  (props, ref) => {
    const {} = props;

    return <div>...CategoriesPicker...</div>;
  }
);

export default CategoriesPicker;
