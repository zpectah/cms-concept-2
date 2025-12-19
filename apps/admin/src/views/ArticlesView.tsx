import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { modelKeys } from '@model';
import { getConfig } from '../config';
import { ViewLayout, NewItemButton } from '../components';

const ArticlesView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['views']);

  return (
    <ViewLayout
      model={modelKeys.articles}
      rootUrl={routes.articles.root}
      title={t('articles.title')}
      titleSlot={<NewItemButton model={modelKeys.articles} />}
    >
      <Outlet />
    </ViewLayout>
  );
};

export default ArticlesView;
