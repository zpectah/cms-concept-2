import { Container, Text } from '@chakra-ui/react';
import { getConfig } from '../../config';
import { classNames } from '../../utils';
import { FooterProps } from './types';

const Footer = ({ children }: FooterProps) => {
  const {
    cms: { version, meta },
  } = getConfig();

  return (
    <footer className={classNames('footer')}>
      <Container>
        <div className={classNames('footer-wrapper')}>
          <div className="footer-block">
            <Text fontWeight="light" fontSize=".75rem">
              {meta.title} v{version} | {meta.description}
            </Text>
          </div>
          {children && <div className="footer-block">{children}</div>}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
