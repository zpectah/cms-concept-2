import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { modelKeys } from '@model';
import { getConfig } from '../config';
import { ViewLayout } from '../components';

const TagsView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['views']);

  return (
    <ViewLayout
      model={modelKeys.tags}
      rootUrl={routes.tags.root}
      title={t('tags.title')}
    >
      <Outlet />
    </ViewLayout>
  );
};

export default TagsView;
