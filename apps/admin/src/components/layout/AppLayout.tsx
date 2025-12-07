import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { classNames } from '../../utils';
import { appLayoutVariantKeys } from '../../enums';
import { AppLayoutProps } from './types';
import Header from './Header';
import Footer from './Footer';

import './layout.scss';

/** Layout for wrap app page in router **/

const AppLayout = ({
  variant = appLayoutVariantKeys.default,
  slots,
}: AppLayoutProps) => {
  const { i18n } = useTranslation();

  return (
    <>
      <div
        id="app-layout"
        className={classNames('app-layout', variant)}
        data-locale={i18n.language}
      >
        <Header variant={variant} />
        <div className={classNames('app-layout-wrapper')}>
          <main className="main">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
      {slots?.toasts}
      {slots?.profile}
      {slots?.confirmDialog}
    </>
  );
};

export default AppLayout;
