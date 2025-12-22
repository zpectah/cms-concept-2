import { modelKeys, ModelNames } from '@model';
import { useTranslation } from 'react-i18next';
import { getConfig } from '../config';

interface UseNewItemProps {
  current?: ModelNames;
}

export const useNewItem = ({ current }: UseNewItemProps) => {
  const { routes } = getConfig();

  const { t } = useTranslation();

  const modelLinkItems = [
    {
      id: modelKeys.articles,
      label: t('button.new.articles'),
      path: `${routes.articles.root}/id/new`,
      disabled: false,
    },
    {
      id: modelKeys.categories,
      label: t('button.new.categories'),
      path: `${routes.categories.root}/id/new`,
      disabled: false,
    },
    {
      id: modelKeys.customFields,
      label: t('button.new.customFields'),
      path: `${routes.customFields.root}/id/new`,
      disabled: false,
    },
    {
      id: modelKeys.files,
      label: t('button.new.files'),
      path: `${routes.files.root}/id/new`,
      disabled: false,
    },
    {
      id: modelKeys.members,
      label: t('button.new.members'),
      path: `${routes.members.root}/id/new`,
      disabled: false,
    },
    {
      id: modelKeys.menu,
      label: t('button.new.menu'),
      path: `${routes.menu.root}/id/new`,
      disabled: false,
    },
    {
      id: modelKeys.pages,
      label: t('button.new.pages'),
      path: `${routes.pages.root}/id/new`,
      disabled: false,
    },
    {
      id: modelKeys.tags,
      label: t('button.new.tags'),
      path: `${routes.tags.root}/id/new`,
      disabled: false,
    },
    {
      id: modelKeys.translations,
      label: t('button.new.translations'),
      path: `${routes.translations.root}/id/new`,
      disabled: false,
    },
    {
      id: modelKeys.users,
      label: t('button.new.users'),
      path: `${routes.users.root}/id/new`,
      disabled: false,
    },
  ];

  return {
    current: modelLinkItems.find((item) => item.id === current),
    options: modelLinkItems.filter((item) => item.id !== current),
    all: modelLinkItems,
  };
};
