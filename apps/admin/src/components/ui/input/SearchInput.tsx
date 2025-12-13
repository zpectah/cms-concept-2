import { forwardRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
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
        startAdornment={<SearchIcon />}
        {...rest}
      />
    );
  }
);

export default SearchInput;
