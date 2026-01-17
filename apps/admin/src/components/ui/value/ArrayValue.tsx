import { Stack, Chip } from '@mui/material';
import { ArrayValueProps } from './types';

const ArrayValue = ({ id, value, stackProps, chipProps }: ArrayValueProps) => {
  return (
    <Stack
      id={id}
      direction="row"
      gap={0.5}
      alignItems="center"
      justifyContent="end"
      sx={{ flex: 1 }}
      {...stackProps}
    >
      {value.map((val) => (
        <Chip key={val} label={val} size="small" {...chipProps} />
      ))}
    </Stack>
  );
};

export default ArrayValue;
