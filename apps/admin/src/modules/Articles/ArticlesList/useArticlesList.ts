import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getConfig } from '../../../config';
import { CLONE_PATH_ATTRIBUTE_NAME } from '../../../constants';
import { useArticlesQuery } from '../../../query';
import { useResponseMessage } from '../../../hooks';
import { useAppStore } from '../../../store';

const mock_categories = [
  {
    id: 1,
    type: 'default',
    name: 'foo-foo',
    parent: 0,
    active: true,
    deleted: false,
    created: '2025-10-26 17:45:41',
    updated: '2025-10-26 17:45:41',
  },
  {
    id: 2,
    type: 'default',
    name: 'bar-bar-bar',
    parent: 0,
    active: true,
    deleted: false,
    created: '2025-10-26 17:46:14',
    updated: '2025-10-26 17:48:18',
  },
  {
    id: 3,
    type: 'default',
    name: 'sub-sub-eee-sdfsds',
    parent: 1,
    active: true,
    deleted: false,
    created: '2025-10-26 17:46:35',
    updated: '2025-11-08 13:34:44',
  },
  {
    id: 5,
    type: 'default',
    name: 'schuze',
    parent: 0,
    active: true,
    deleted: false,
    created: '2025-11-09 09:56:14',
    updated: '2025-11-09 09:56:14',
  },
];
const mock_tags = [
  {
    id: 1,
    type: 'default',
    color: 'pink',
    name: 'tag 1 panda',
    active: false,
    deleted: false,
    created: '2025-10-25 10:33:17',
    updated: '2025-11-17 15:18:10',
  },
  {
    id: 2,
    type: 'default',
    color: 'red',
    name: 'tag 2 red',
    active: true,
    deleted: false,
    created: '2025-10-25 10:33:17',
    updated: '2025-10-25 12:07:34',
  },
  {
    id: 3,
    type: 'default',
    color: 'blue',
    name: 'test tag',
    active: true,
    deleted: false,
    created: '2025-10-25 11:06:02',
    updated: '2025-10-25 11:06:02',
  },
  {
    id: 4,
    type: 'default',
    color: 'none',
    name: 'miuuu',
    active: true,
    deleted: false,
    created: '2025-10-25 12:07:20',
    updated: '2025-10-25 14:12:08',
  },
  {
    id: 5,
    type: 'default',
    color: 'none',
    name: 'foo',
    active: true,
    deleted: false,
    created: '2025-10-25 12:28:07',
    updated: '2025-10-25 12:28:07',
  },
  {
    id: 6,
    type: 'default',
    color: 'purple',
    name: 'fufufu',
    active: true,
    deleted: false,
    created: '2025-10-25 13:53:37',
    updated: '2025-10-25 14:13:25',
  },
  {
    id: 7,
    type: 'default',
    color: 'blue',
    name: 'boooo',
    active: true,
    deleted: false,
    created: '2025-10-25 14:00:18',
    updated: '2025-11-08 13:27:25',
  },
  {
    id: 10,
    type: 'default',
    color: 'orange',
    name: 'lalala',
    active: true,
    deleted: false,
    created: '2025-11-16 15:38:51',
    updated: '2025-11-16 15:40:50',
  },
];

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

  const { data: items, refetch } = articlesQuery;
  const { mutate: onToggle } = articlesToggleMutation;
  const { mutate: onDelete } = articlesDeleteMutation;
  const { mutate: onDeletePermanent } = articlesDeletePermanentMutation;
  const { mutate: onApprove } = articlesApproveMutation;

  const toggleHandler = (ids: number[]) => {
    onToggle([...ids], {
      onSuccess: ({ rows }) => {
        addToast({
          title: t('message.success.update', { count: rows }),
          severity: 'success',
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
          severity: 'success',
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
          severity: 'success',
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
          severity: 'success',
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
      categories: [...mock_categories],
      tags: [...mock_tags],
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
      items: false,
      submitting: false,
    },
  };
};
