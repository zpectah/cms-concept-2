import { styled, Container, Stack } from '@mui/material';
import { useAppContext } from '../../contexts';
import { SPACING } from '../../constants';
import { appLayoutVariantKeys } from '../../enums';
import { classNames } from '../../utils';
import { MainMenu, LocaleMenu } from '../menu';
import { LogoutTrigger, ThemeModeToggle, ProfileToggle } from '../controls';
import { HeaderProps } from './types';
import Logo from './Logo';

const Wrapper = styled('header')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Content = styled('div')(({ theme }) => ({
  minHeight: '4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(SPACING.content),
}));

const Block = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(SPACING.actions),
}));

const Header = ({ variant }: HeaderProps) => {
  const { containerWidth } = useAppContext();

  const isDefaultVariant = variant === appLayoutVariantKeys.default;

  return (
    <Wrapper id="header" className={classNames(`variant--${variant}`)}>
      <Container maxWidth={containerWidth}>
        <Content>
          {isDefaultVariant && (
            <Block>
              <MainMenu />
            </Block>
          )}
          <Block>
            <Logo />
          </Block>
          <Block>
            <ThemeModeToggle />
            <LocaleMenu />
            {isDefaultVariant && (
              <>
                <ProfileToggle />
                <LogoutTrigger />
              </>
            )}
          </Block>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Header;
