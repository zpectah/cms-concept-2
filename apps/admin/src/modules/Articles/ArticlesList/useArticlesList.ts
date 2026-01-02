import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getConfig } from '../../../config';
import { CLONE_PATH_ATTRIBUTE_NAME } from '../../../constants';
import {
  useArticlesQuery,
  useTagsQuery,
  useCategoriesQuery,
} from '../../../query';
import { useResponseMessage } from '../../../hooks';
import { useAppStore } from '../../../store';

export const useArticlesList = () => {
  const { routes } = getConfig();

  const navigate = useNavigate();
  const { t } = useTranslation(['common']);
  const { addToast } = useAppStore();
  const { onError } = useResponseMessage();
  const {
    articlesQuery,
    articlesToggleMutation,
    articlesDeleteMutation,
    articlesDeletePermanentMutation,
    articlesApproveMutation,
  } = useArticlesQuery({});
  const { tagsQuery } = useTagsQuery({});
  const { categoriesQuery } = useCategoriesQuery({});

  const { data: items, refetch, isLoading } = articlesQuery;
  const { mutate: onToggle } = articlesToggleMutation;
  const { mutate: onDelete } = articlesDeleteMutation;
  const { mutate: onDeletePermanent } = articlesDeletePermanentMutation;
  const { mutate: onApprove } = articlesApproveMutation;
  const { data: tags, isLoading: isTagsLoading } = tagsQuery;
  const { data: categories, isLoading: isCategoriesLoading } = categoriesQuery;

  const toggleHandler = (ids: number[]) => {
    onToggle([...ids], {
      onSuccess: ({ rows }) => {
        addToast({
          title: t('message.success.update', { count: rows }),
          severity: rows === 0 ? 'info' : 'success',
          autoclose: true,
        });
        refetch();
      },
      onError,
    });
  };

  const deleteHandler = (ids: number[]) => {
    onDelete([...ids], {
      onSuccess: ({ rows }) => {
        addToast({
          title: t('message.success.delete', { count: rows }),
          severity: rows === 0 ? 'info' : 'success',
          autoclose: true,
        });
        refetch();
      },
      onError,
    });
  };

  const deletePermanentHandler = (ids: number[]) => {
    onDeletePermanent([...ids], {
      onSuccess: ({ rows }) => {
        addToast({
          title: t('message.success.deletePermanent', { count: rows }),
          severity: rows === 0 ? 'info' : 'success',
          autoclose: true,
        });
        refetch();
      },
      onError,
    });
  };

  const approveHandler = (ids: number[]) => {
    onApprove([...ids], {
      onSuccess: ({ rows }) => {
        addToast({
          title: t('message.success.approve', { count: rows }),
          severity: rows === 0 ? 'info' : 'success',
          autoclose: true,
        });
        refetch();
      },
      onError,
    });
  };

  const cloneHandler = (id: number) => {
    navigate(
      `${routes.articles.root}/id/new?${CLONE_PATH_ATTRIBUTE_NAME}=${id}`
    );
  };

  return {
    items: items ? [...items] : [],
    filter: {
      categories: categories ? [...categories] : [],
      tags: tags ? [...tags] : [],
    },
    rowActions: {
      onDetail: true,
      onDelete: (id: number) => deleteHandler([id]),
      onToggle: (id: number) => toggleHandler([id]),
      onDeletePermanent: (id: number) => deletePermanentHandler([id]),
      onApprove: (id: number) => approveHandler([id]),
      onClone: cloneHandler,
    },
    selectedActions: {
      onToggleSelected: toggleHandler,
      onDeleteSelected: deleteHandler,
      onDeletePermanentSelected: deletePermanentHandler,
      onApproveSelected: approveHandler,
    },
    loading: {
      items: isLoading || isTagsLoading || isCategoriesLoading,
      submitting: false,
    },
  };
};
