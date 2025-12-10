import {
  forwardRef,
  useRef,
  useCallback,
  useState,
  RefObject,
  ForwardedRef,
  ReactElement,
} from 'react';
import { Menu, InputGroup } from '@chakra-ui/react';
import { IconChevronDown } from '@tabler/icons-react';
import { Input } from '../input';
import { InputSelectProps } from './types';

const InputSelect = forwardRef(
  <T = string | number,>(
    props: InputSelectProps<T>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const {
      value,
      onChange,
      options,
      children,
      placeholder,
      disabled,
      multiple = false,
    } = props;

    const singleValue = value as T;
    const multipleValue = value as T[];

    const [width, setWidth] = useState(0);

    const refObj = useRef<HTMLDivElement | null>(null);

    const mergedRef = useCallback(
      (node: HTMLInputElement | null) => {
        refObj.current = node;

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as RefObject<HTMLInputElement | null>).current = node;
        }
      },
      [ref]
    );

    const getAnchorRect = () => {
      if (!refObj.current) {
        throw new Error('Anchor element not found');
      }

      setWidth(refObj.current.clientWidth);

      return refObj.current.getBoundingClientRect();
    };

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

    const getDisplayValue = (): string | undefined => {
      if (multiple) {
        const selectedLabels = options
          ?.filter((item) => isSelected(item.value, multipleValue))
          .map((item) => item.label);

        return selectedLabels?.join(', ') ?? undefined;
      } else {
        const selectedOption = options?.find(
          (item) => item.value === singleValue
        );
        return selectedOption ? (selectedOption.value as string) : undefined;
      }
    };

    return (
      <Menu.Root positioning={{ getAnchorRect }} lazyMount>
        <Menu.Trigger disabled={disabled} asChild>
          <InputGroup endElement={<IconChevronDown size="1rem" />}>
            <Input
              ref={mergedRef}
              value={getDisplayValue()}
              placeholder={placeholder}
              disabled={disabled}
              readOnly
            />
          </InputGroup>
        </Menu.Trigger>
        <Menu.Positioner width={width}>
          <Menu.Content>
            {options?.map((item) => {
              const itemIsSelected = multiple
                ? isSelected(item.value, multipleValue)
                : item.value === singleValue;
              const isDisabled = item.disabled;

              return (
                <Menu.Item
                  key={item.value as string}
                  value={String(item.value)}
                  onClick={() => handleItemClick(item.value)}
                  disabled={isDisabled}
                >
                  {item.label}&nbsp;
                  {itemIsSelected ? '✓ ' : ''}
                </Menu.Item>
              );
            })}
            {children}
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    );
  }
);

export default InputSelect as <T extends string | number>(
  props: InputSelectProps<T> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReactElement;
