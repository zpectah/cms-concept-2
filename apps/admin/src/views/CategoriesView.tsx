import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { modelKeys } from '@model';
import { getConfig } from '../config';
import { ViewLayout } from '../components';

const CategoriesList = lazy(
  () => import('../modules/Categories/CategoriesList/CategoriesList')
);
const CategoriesDetailForm = lazy(
  () =>
    import('../modules/Categories/CategoriesDetailForm/CategoriesDetailForm')
);

const CategoriesView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['views']);

  return (
    <ViewLayout
      model={modelKeys.categories}
      rootUrl={routes.categories.root}
      title={t('categories.title')}
    >
      <CategoriesList />
      <CategoriesDetailForm />
    </ViewLayout>
  );
};

export default CategoriesView;
