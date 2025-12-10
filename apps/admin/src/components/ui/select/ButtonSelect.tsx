import { forwardRef } from 'react';
import { Menu } from '@chakra-ui/react';
import { Button } from '../button';
import { ButtonSelectProps } from './types';
import { IconChevronDown } from '@tabler/icons-react';

const ButtonSelect = forwardRef<HTMLInputElement, ButtonSelectProps>(
  (props, ref) => {
    const {
      options = [],
      disabled,
      placeholder,
      value,
      onChange,
      children,
      buttonProps,
    } = props;

    const handleItemClick = (itemValue: string | number) => {
      (onChange as (value: string | number) => void)(itemValue);
    };

    const getDisplayValue = (): string | undefined => {
      const selectedOption = options?.find((item) => item.value === value);
      return selectedOption ? (selectedOption.value as string) : placeholder;
    };

    return (
      <>
        <input type="hidden" value={getDisplayValue()} ref={ref} />
        <Menu.Root positioning={{}} lazyMount>
          <Menu.Trigger disabled={disabled} asChild>
            <Button variant="outline" {...buttonProps}>
              {getDisplayValue()} <IconChevronDown />
            </Button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              {options?.map((item) => {
                const IsSelected = item.value === value;
                const isDisabled = item.disabled;

                return (
                  <Menu.Item
                    key={item.value as string}
                    value={String(item.value)}
                    onClick={() => handleItemClick(item.value)}
                    disabled={isDisabled}
                  >
                    {item.label}&nbsp;
                    {IsSelected ? '✓ ' : ''}
                  </Menu.Item>
                );
              })}
              {children}
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </>
    );
  }
);

export default ButtonSelect;
