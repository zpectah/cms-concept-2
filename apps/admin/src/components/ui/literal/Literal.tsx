import { Field } from '../field';
import { LiteralProps } from './types';

const Literal = ({ label, value, ...rest }: LiteralProps) => {
  return (
    <Field label={label} {...rest}>
      {value}
    </Field>
  );
};

export default Literal;
