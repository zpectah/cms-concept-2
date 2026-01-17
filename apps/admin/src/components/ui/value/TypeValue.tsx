import { Chip } from '@mui/material';
import { getOptionValue } from '../../../helpers';
import { TypeValueProps } from './types';

const TypeValue = ({ id, value, prefix, chipProps }: TypeValueProps) => {
  return (
    <Chip
      id={id}
      label={getOptionValue(value, prefix)}
      size="small"
      color="info"
      variant="outlined"
      {...chipProps}
    />
  );
};

export default TypeValue;
