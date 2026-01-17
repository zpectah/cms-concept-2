import { Stack } from '@mui/material';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';
import { BooleanValueProps } from './types';

const BooleanValue = ({ id, value, fontSize = '1rem' }: BooleanValueProps) => {
  return (
    <Stack id={id}>
      {value ? (
        <IconCircleCheck fontSize={fontSize} />
      ) : (
        <IconCircleX fontSize={fontSize} />
      )}
    </Stack>
  );
};

export default BooleanValue;
