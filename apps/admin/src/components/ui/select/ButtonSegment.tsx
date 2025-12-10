import { forwardRef } from 'react';
import { SegmentGroup } from '@chakra-ui/react';
import { ButtonSegmentProps } from './types';

const ButtonSegment = forwardRef<HTMLDivElement, ButtonSegmentProps>(
  (props, ref) => {
    const { value, onChange, options, ...rest } = props;

    return (
      <SegmentGroup.Root
        value={value as string}
        onValueChange={(event) => onChange(event.value as string)}
        ref={ref}
        {...rest}
      >
        <SegmentGroup.Indicator />
        {options?.map((option) => (
          <SegmentGroup.Item key={option.id} value={option.value as string}>
            <SegmentGroup.ItemText>{option.label}</SegmentGroup.ItemText>
            <SegmentGroup.ItemHiddenInput value={option.value as string} />
          </SegmentGroup.Item>
        ))}
      </SegmentGroup.Root>
    );
  }
);

export default ButtonSegment;
