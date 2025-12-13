import { forwardRef, ForwardedRef } from 'react';
import { styled, Stack } from '@mui/material';
import { OptionItem, TagSelectProps } from './types';
import { Button } from '../button';

const SelectWrapper = styled(Stack)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  flexDirection: 'row',
  gap: theme.spacing(1),
}));

const TagSelect = forwardRef(
  <T = string | number,>(
    props: TagSelectProps<T>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const {
      options = [],
      buttonProps,
      value,
      defaultValue,
      onChange,
      disabled,
      multiple,
      renderSelectedValue,
    } = props;

    const singleValue = defaultValue ? (defaultValue as T) : (value as T);
    const multipleValue = defaultValue ? (defaultValue as T[]) : (value as T[]);

    const isSelected = <T,>(value: T, currentValue: T[]): boolean => {
      return currentValue.includes(value);
    };

    const toggleValueHandler = <T,>(value: T, currentValue: T[]): T[] => {
      if (isSelected(value, currentValue)) {
        return currentValue.filter((item) => item !== value);
      } else {
        return [...currentValue, value];
      }
    };

    const itemClickHandler = (itemValue: T) => {
      if (multiple) {
        const nextValue = toggleValueHandler(itemValue, multipleValue);
        (onChange as (value: T[]) => void)?.(nextValue);
      } else {
        (onChange as (value: T) => void)?.(itemValue);
      }
    };

    return (
      <SelectWrapper>
        {options.map((option, index) => {
          const itemIsSelected = multiple
            ? isSelected(option.value, multipleValue as (string | number)[])
            : option.value === singleValue;
          const itemRef = index === 0 ? ref : undefined;

          if (option.hidden) return null;

          return (
            <Button
              key={index}
              onClick={() => itemClickHandler(option.value as T)}
              disabled={disabled || option.disabled}
              variant={itemIsSelected ? 'contained' : 'outlined'}
              ref={itemRef}
              {...buttonProps}
            >
              {renderSelectedValue && itemIsSelected
                ? renderSelectedValue(option as OptionItem<T>)
                : option.label}
            </Button>
          );
        })}
      </SelectWrapper>
    );
  }
);

export default TagSelect;
