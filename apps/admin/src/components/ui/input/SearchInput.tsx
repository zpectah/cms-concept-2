import { forwardRef } from 'react';
import { IconZoom } from '@tabler/icons-react';
import { SearchInputProps } from './types';
import InputPlus from './InputPlus';

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => {
    const { ...rest } = props;

    return (
      <InputPlus
        ref={ref}
        type="search"
        inputMode="search"
        startAdornment={<IconZoom />}
        {...rest}
      />
    );
  }
);

export default SearchInput;
