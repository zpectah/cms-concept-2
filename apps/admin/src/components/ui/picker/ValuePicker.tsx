import { forwardRef, useState, useEffect, KeyboardEvent } from 'react';
import { TextField, Chip, Stack } from '@mui/material';
import { ValuePickerProps } from './types';

const ValuePicker = forwardRef<HTMLInputElement, ValuePickerProps>(
  (props, ref) => {
    const { value, defaultValue, onChange, placeholder, isReadOnly, ...rest } =
      props;

    const [tags, setTags] = useState<string[]>(value || defaultValue || []);
    const [inputValue, setInputValue] = useState<string>('');

    const updateTags = (newTags: string[]) => {
      if (value === undefined) setTags(newTags);

      onChange?.(newTags);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const trimmedValue = inputValue.trim();

        if (trimmedValue && !tags.includes(trimmedValue)) {
          updateTags([...tags, trimmedValue]);
          setInputValue('');
        }
      } else if (event.key === 'Backspace' && !inputValue && tags.length > 0) {
        handleDelete(tags[tags.length - 1]);
      }
    };

    const handleDelete = (tagToDelete: string) => {
      updateTags(tags.filter((tag) => tag !== tagToDelete));
    };

    useEffect(() => {
      if (value !== undefined) setTags(value);
    }, [value]);

    return (
      <TextField
        ref={ref}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        {...rest}
        slotProps={{
          input: {
            readOnly: isReadOnly,
            startAdornment: (
              <Stack
                direction="row"
                gap={1}
                sx={{
                  my: 2,
                  pr: 1,
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleDelete(tag)}
                    size="small"
                  />
                ))}
              </Stack>
            ),
            ...rest?.slotProps?.input,
          },
          ...rest?.slotProps,
        }}
        sx={{
          '& .MuiInputBase-root': {
            flexWrap: 'wrap',
          },
          '& .MuiInputBase-input': {
            width: 'auto',
            flexGrow: 1,
          },
          ...rest?.sx,
        }}
      />
    );
  }
);

export default ValuePicker;
