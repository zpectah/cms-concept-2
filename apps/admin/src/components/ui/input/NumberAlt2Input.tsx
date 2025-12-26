import {
  forwardRef,
  useState,
  useEffect,
  useMemo,
  ChangeEvent,
  FocusEvent,
} from 'react';
import { Box } from '@mui/material';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { NumberInputAlt2Props } from './types';
import InputPlus from './InputPlus';

const NumberAlt2Input = forwardRef<HTMLInputElement, NumberInputAlt2Props>(
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
        endAdornment={
          <Box
            sx={{
              height: '100%',
              width: '2.6rem',
              marginRight: '-0.5rem',

              display: 'flex',
              flexDirection: 'column',

              '& button': {
                width: '100%',
                height: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 0,
                color: 'inherit',
                cursor: 'pointer',
              },
            }}
          >
            <button type="button" onClick={handleIncrement}>
              <IconPlus size="1rem" />
            </button>
            <button type="button" onClick={handleDecrement}>
              <IconMinus size="1rem" />
            </button>
          </Box>
        }
        {...rest}
      />
    );
  }
);

export default NumberAlt2Input;
