import { ForwardedRef, forwardRef } from 'react';
import { Stack } from '@chakra-ui/react';
import { Button } from '../button';
import { TagSelectProps } from './types';

const TagSelect = forwardRef(
  <T = string | number,>(
    props: TagSelectProps<T>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const {
      value,
      onChange,
      disabled,
      options = [],
      buttonProps,
      multiple,
      renderSelectedValue,
    } = props;

    const singleValue = value as T;
    const multipleValue = value as T[];

    const isSelected = <T,>(value: T, currentValue: T[]): boolean => {
      return currentValue.includes(value);
    };

    const toggleValue = <T,>(value: T, currentValue: T[]): T[] => {
      if (isSelected(value, currentValue)) {
        return currentValue.filter((item) => item !== value);
      } else {
        return [...currentValue, value];
      }
    };

    const handleItemClick = (itemValue: T) => {
      if (multiple) {
        const nextValue = toggleValue(itemValue, multipleValue);
        (onChange as (value: T[]) => void)(nextValue);
      } else {
        (onChange as (value: T) => void)(itemValue);
      }
    };

    return (
      <Stack direction="row" gap={2}>
        {options.map((option, index) => {
          const itemIsSelected = multiple
            ? isSelected(option.value, multipleValue)
            : option.value === singleValue;
          const itemRef = index === 0 ? ref : undefined;

          return (
            <Button
              key={index}
              onClick={() => handleItemClick(option.value)}
              disabled={disabled || option.disabled}
              variant={itemIsSelected ? 'solid' : 'outline'}
              ref={itemRef}
              {...buttonProps}
            >
              {renderSelectedValue && itemIsSelected
                ? renderSelectedValue(option)
                : option.label}
            </Button>
          );
        })}
      </Stack>
    );
  }
);

export default TagSelect;
