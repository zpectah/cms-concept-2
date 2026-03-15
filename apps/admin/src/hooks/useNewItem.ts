import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { modelKeys, ModelNames } from '@model';
import { getConfig } from '../config';
import { useUserActions } from './useUserActions';

interface UseNewItemProps {
  current?: ModelNames;
}

export const useNewItem = ({ current }: UseNewItemProps) => {
  const { routes } = getConfig();

  const { t } = useTranslation();
  const { groups, getGroupByModel } = useUserActions(undefined);

  const modelLinks = useMemo(() => {
    return [
      /** Also used for order */
      modelKeys.articles,
      modelKeys.categories,
      modelKeys.customFields,
      modelKeys.files,
      modelKeys.members,
      modelKeys.menu,
      modelKeys.pages,
      modelKeys.tags,
      modelKeys.translations,
      modelKeys.users,
    ].map((item) => {
      const group = getGroupByModel(item);
      const isHidden = !group ? true : !groups[group].view;

      return {
        id: item,
        label: t(`button.new.${item}`),
        path: `${routes[item].root}/id/new`,
        disabled: false,
        hidden: isHidden,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, groups]);

  /*
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
  */

  return {
    current: modelLinks.find((item) => item.id === current),
    options: modelLinks.filter((item) => item.id !== current),
    all: modelLinks,
  };
};
