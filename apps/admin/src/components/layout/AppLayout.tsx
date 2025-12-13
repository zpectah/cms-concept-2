import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material';
import { classNames } from '../../utils';
import { appLayoutVariantKeys } from '../../enums';
import { AppLayoutProps } from './types';
import Header from './Header';

const Wrapper = styled('div')(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));
const HeaderContainer = styled('div')(() => ({
  flex: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}));
const ContentContainer = styled('div')(() => ({
  minHeight: 0,
  flex: 1,
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
}));
const Content = styled('main')(() => ({
  width: '100%',
  minHeight: 0,
  flex: 1,
  position: 'relative',
  boxSizing: 'content-box',
}));

const AppLayout = ({
  variant = appLayoutVariantKeys.default,
  slots,
}: AppLayoutProps) => {
  return (
    <>
      <Wrapper id="app-layout" className={classNames(`variant--${variant}`)}>
        <HeaderContainer>
          {slots?.announcements}
          <Header variant={variant} />
        </HeaderContainer>
        <ContentContainer>
          <Content>
            <Outlet />
          </Content>
        </ContentContainer>
      </Wrapper>
      {slots?.toasts}
      {slots?.profile}
      {slots?.confirmDialog}
    </>
  );
};

export default AppLayout;
