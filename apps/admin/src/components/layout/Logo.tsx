import { Link } from 'react-router-dom';
import { styled } from '@mui/material';
import { getConfig } from '../../config';

interface LogoProps {
  disableLink?: boolean;
}

const Wrapper = styled('span')(({ theme }) => ({
  ...theme.typography.h4,
  fontWeight: 900,
  padding: 0,
  lineHeight: 0,
  letterSpacing: '-0.05rem',
  textDecoration: 'none',
  textTransform: 'uppercase',
  color: 'inherit',
}));

const WrapperLink = styled(Link)(({ theme }) => ({
  ...theme.typography.h4,
  fontWeight: 900,
  padding: 0,
  lineHeight: 0,
  letterSpacing: '-0.05rem',
  opacity: 0.9,
  cursor: 'pointer',
  textDecoration: 'none',
  textTransform: 'uppercase',
  color: 'inherit',

  '&:hover': {
    opacity: 1,
  },
}));

const Logo = ({ disableLink }: LogoProps) => {
  const {
    routes,
    cms: { meta },
  } = getConfig();

  if (disableLink) return <Wrapper>{meta.title}</Wrapper>;

  return <WrapperLink to={routes.dashboard.root}>{meta.title}</WrapperLink>;
};

export default Logo;
