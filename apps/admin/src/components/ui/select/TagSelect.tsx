import { forwardRef, ForwardedRef } from 'react';
import { styled, Stack, Chip } from '@mui/material';
import { OptionItem, TagSelectProps } from './types';
import { Label } from '../label';

const SelectWrapper = styled(Stack)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

const TagSelect = forwardRef(
  <T = string | number,>(
    props: TagSelectProps<T>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const {
      options = [],
      value,
      defaultValue,
      onChange,
      disabled,
      multiple,
      renderSelectedValue,
      renderSelectedIcon,
      label,
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
      <Stack direction="column" gap={0.5} ref={ref}>
        {label && <Label>{label}</Label>}
        <SelectWrapper>
          {options.map((option, index) => {
            const itemIsSelected = multiple
              ? isSelected(option.value, multipleValue as (string | number)[])
              : option.value === singleValue;

            const icon = () => {
              if (renderSelectedIcon && itemIsSelected)
                return (
                  <span>{renderSelectedIcon(option as OptionItem<T>)}</span>
                );

              return undefined;
            };

            if (option.hidden) return null;

            return (
              <Chip
                key={index}
                onClick={() => itemClickHandler(option.value as T)}
                disabled={disabled || option.disabled}
                variant={itemIsSelected ? 'filled' : 'outlined'}
                size="small"
                icon={icon()}
                label={
                  renderSelectedValue && itemIsSelected
                    ? renderSelectedValue(option as OptionItem<T>)
                    : option.label
                }
              />
            );
          })}
        </SelectWrapper>
      </Stack>
    );
  }
);

export default TagSelect;
