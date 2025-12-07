import { lazy } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { getConfig } from '../config';
import { usePageTitle } from '../helpers';
import { NEW_ITEM_KEY } from '../constants';
import { ViewLayout } from '../components';

const ArticlesList = lazy(
  () => import('../modules/Articles/ArticlesList/ArticlesList')
);
const ArticlesDetailForm = lazy(
  () => import('../modules/Articles/ArticlesDetailForm/ArticlesDetailForm')
);

const ArticlesView = () => {
  const { routes } = getConfig();

  const { id } = useParams();

  usePageTitle({
    id,
    title: {
      new: 'New article',
      detail: 'Article detail',
      page: 'Articles',
    },
  });

  return (
    <ViewLayout
      titleSlot={
        <Button asChild>
          <Link to={`${routes.articles.root}/${NEW_ITEM_KEY}`}>
            New article
          </Link>
        </Button>
      }
    >
      <ArticlesList />
      <ArticlesDetailForm />
    </ViewLayout>
  );
};

export default ArticlesView;
