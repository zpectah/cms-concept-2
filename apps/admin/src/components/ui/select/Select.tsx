import { forwardRef } from 'react';
import { Select as MuiSelect, MenuItem, Typography } from '@mui/material';
import { SelectProps } from './types';

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const {
    id,
    options = [],
    children,
    placeholder = 'Pick item(s)',
    forcePlaceholder,
    ...rest
  } = props;

  const renderValue = (value: unknown) => {
    if (!value || (value as (number | string)[]).length === 0) {
      return (
        <Typography
          sx={({ palette }) => ({
            color: palette.text.disabled,
            m: 0,
            p: 0,
          })}
        >
          {placeholder}
        </Typography>
      );
    }

    return <>{value}</>;
  };

  return (
    <MuiSelect
      id={id}
      ref={ref}
      displayEmpty
      renderValue={forcePlaceholder ? renderValue : undefined}
      {...rest}
    >
      {placeholder && !forcePlaceholder && (
        <MenuItem value="''" disabled>
          {placeholder}
        </MenuItem>
      )}
      {options.map(({ id, value, label, itemProps, hidden, ...option }) => {
        if (hidden) return null;

        return (
          <MenuItem key={id} value={value} {...itemProps} {...option}>
            {label}
          </MenuItem>
        );
      })}
      {children}
    </MuiSelect>
  );
});

export default Select;
