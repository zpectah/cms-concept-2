import { Link } from 'react-router-dom';
import { Heading } from '@chakra-ui/react';
import { getConfig } from '../../config';
import { LogoProps } from './types';

const Logo = ({ disableLink }: LogoProps) => {
  const {
    cms: { meta },
    routes,
  } = getConfig();

  return (
    <Heading
      size="xl"
      as="h1"
      fontWeight="800"
      asChild={!disableLink}
      textTransform="uppercase"
    >
      {!disableLink ? (
        <Link to={routes.dashboard.root}>{meta.title}</Link>
      ) : (
        meta.title
      )}
    </Heading>
  );
};

export default Logo;
