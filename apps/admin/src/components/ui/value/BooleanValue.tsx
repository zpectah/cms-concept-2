import { Stack } from '@mui/material';
import { IconCheck, IconX } from '@tabler/icons-react';
import { BooleanValueProps } from './types';

const BooleanValue = ({ id, value, fontSize = '1rem' }: BooleanValueProps) => {
  return (
    <Stack id={id}>
      {value ? (
        <IconCheck fontSize={fontSize} />
      ) : (
        <IconX fontSize={fontSize} />
      )}
    </Stack>
  );
};

export default BooleanValue;
