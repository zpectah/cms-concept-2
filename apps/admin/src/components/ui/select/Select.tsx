import { forwardRef } from 'react';
import { Select as MuiSelect, MenuItem, Typography } from '@mui/material';
import { SelectProps } from './types';
import { useTranslation } from 'react-i18next';

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const {
    id,
    options = [],
    children,
    placeholder,
    forcePlaceholder,
    showSingleOption,
    disabled,
    ...rest
  } = props;

  const { t } = useTranslation(['common']);

  const isDisabledDueOneOption = !showSingleOption && options.length === 1;
  const fieldPlaceholder = placeholder
    ? placeholder
    : rest.multiple
    ? t('label.pickMore')
    : t('label.pickOne');

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
          {fieldPlaceholder}
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
      disabled={isDisabledDueOneOption || disabled}
      {...rest}
    >
      {placeholder && !forcePlaceholder && (
        <MenuItem value="''" disabled>
          {fieldPlaceholder}
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
