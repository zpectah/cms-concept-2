import { forwardRef } from 'react';
import { TagsPickerProps } from './types';

const TagsPicker = forwardRef<HTMLInputElement, TagsPickerProps>(
  (props, ref) => {
    const {} = props;

    return <div>...TagsPicker...</div>;
  }
);

export default TagsPicker;
