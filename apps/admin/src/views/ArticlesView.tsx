import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { modelKeys } from '@model';
import { getConfig } from '../config';
import { LinkButton, ViewLayout } from '../components';

const ArticlesList = lazy(
  () => import('../modules/Articles/ArticlesList/ArticlesList')
);
const ArticlesDetailForm = lazy(
  () => import('../modules/Articles/ArticlesDetailForm/ArticlesDetailForm')
);

const ArticlesView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['views']);

  return (
    <ViewLayout
      model={modelKeys.articles}
      rootUrl={routes.articles.root}
      title={t('articles.title')}
      titleSlot={
        <LinkButton
          variant="contained"
          color="success"
          to={`${routes.articles.root}/id/new`}
        >
          + {t('articles.new')}
        </LinkButton>
      }
    >
      <ArticlesList />
      <ArticlesDetailForm />
    </ViewLayout>
  );
};

export default ArticlesView;
