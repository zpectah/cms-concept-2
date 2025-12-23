import {
  forwardRef,
  useState,
  useEffect,
  useMemo,
  ChangeEvent,
  FocusEvent,
} from 'react';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { IconButtonPlus } from '../button';
import { NumberInputAltProps } from './types';
import InputPlus from './InputPlus';

const NumberAltInput = forwardRef<HTMLInputElement, NumberInputAltProps>(
  (props, ref) => {
    const {
      pattern = '[0-9]*',
      onChange,
      onBlur,
      value = 0,
      min = -Infinity,
      max = -Infinity,
      step = 1,
      slotProps,
      centered = true,
      disabled,
      ...rest
    } = props;

    const [internalValue, setInternalValue] = useState<number>(value ?? 0);

    const finalSlotProps = {
      htmlInput: {
        pattern,
        min,
        max,
        step,
        value,
        style: { textAlign: centered ? 'center' : 'initial' },
      },
      ...slotProps,
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);

      setInternalValue(val);
      onChange?.(val);
    };

    const handleBlur = (e: FocusEvent) => {
      setInternalValue(internalValue);

      onBlur?.(e as FocusEvent<HTMLInputElement>);
    };

    const handleDecrement = () => {
      if (min !== -Infinity && internalValue <= min) return;

      onChange?.(internalValue - step);
    };

    const handleIncrement = () => {
      if (max !== -Infinity && internalValue >= max) return;

      onChange?.(internalValue + step);
    };

    const isDisabled = useMemo(() => {
      if (disabled) return true;

      return (
        (min !== -Infinity && internalValue <= min) ||
        (max !== -Infinity && internalValue >= max)
      );
    }, [min, max, internalValue, disabled]);

    useEffect(() => setInternalValue(value), [value]);

    return (
      <InputPlus
        type="number"
        inputMode="numeric"
        slotProps={finalSlotProps}
        inputRef={ref}
        onChange={handleInputChange}
        onBlur={handleBlur}
        disabled={isDisabled}
        startAdornment={
          <IconButtonPlus onClick={handleDecrement}>
            <IconMinus />
          </IconButtonPlus>
        }
        endAdornment={
          <IconButtonPlus onClick={handleIncrement}>
            <IconPlus />
          </IconButtonPlus>
        }
        {...rest}
      />
    );
  }
);

export default NumberAltInput;
