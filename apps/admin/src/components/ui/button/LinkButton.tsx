import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { LinkButtonProps } from './types';

const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(
  (props, ref) => {
    const { to, ...rest } = props;

    return <Button component={Link} to={to} {...rest} />;
  }
);

export default LinkButton;
