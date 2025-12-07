import { Container } from '@chakra-ui/react';
import { classNames } from '../../utils';
import { AppLayoutVariant } from '../../types';
import { appLayoutVariantKeys } from '../../enums';
import { ThemeModeToggle, ProfileToggle } from '../controls';
import { MainMenu, LocalesMenu } from '../menu';
import Logo from './Logo';

import './layout.scss';

interface HeaderProps {
  variant?: AppLayoutVariant;
}

const Header = ({ variant }: HeaderProps) => (
  <header className={classNames('header', variant)}>
    <Container>
      <div className={classNames('header-wrapper')}>
        <div className={classNames('header-block')}>
          {variant !== appLayoutVariantKeys.minimal && <MainMenu />}
          <Logo disableLink={variant === appLayoutVariantKeys.minimal} />
        </div>
        <div className={classNames('header-block')}>
          <ThemeModeToggle />
          <LocalesMenu />
          {variant !== appLayoutVariantKeys.minimal && <ProfileToggle />}
        </div>
      </div>
    </Container>
  </header>
);

export default Header;
