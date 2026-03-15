import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { modelKeys, ModelNames } from '@model';
import { getConfig } from '../config';
import { useUserActions } from './useUserActions';

export const useMenuItems = () => {
  const {
    routes,
    locales,
    cms: {
      admin: { locale },
    },
  } = getConfig();

  const { i18n, t } = useTranslation();
  const { groups, getGroupByModel } = useUserActions(undefined);

  const createLocaleMenu = () => {
    const items: { id: string; label: string; isActive: boolean }[] = [];

    locale.active.forEach((loc) => {
      items.push({
        id: loc,
        label: (locales as Record<string, { label: string }>)[loc].label,
        isActive: loc === i18n.language,
      });
    });

    return items;
  };

  const mainMenuItems = useMemo(() => {
    return (
      [
        /** Also used for order */
        modelKeys.dashboard,
        modelKeys.articles,
        modelKeys.categories,
        modelKeys.customFields,
        modelKeys.files,
        modelKeys.members,
        modelKeys.menu,
        modelKeys.messages,
        modelKeys.pages,
        modelKeys.settings,
        modelKeys.tags,
        modelKeys.translations,
        modelKeys.users,
      ] as ModelNames[]
    ).map((item) => {
      const group = getGroupByModel(item);
      const isHidden = !group ? true : !groups[group].view;

      return {
        id: item,
        label: t(`routes.${item}`),
        path: routes[item].root,
        disabled: false,
        hidden: isHidden,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, groups]);

  /*
  const mainMenu = [
    {
      id: 'dashboard',
      label: t('routes.dashboard'),
      path: routes.dashboard.root,
      disabled: false,
      hidden: !groups.redaction.view,
    },
    {
      id: 'articles',
      label: t('routes.articles'),
      path: routes.articles.root,
      disabled: false,
      hidden: !groups.redaction.view,
    },
    {
      id: 'categories',
      label: t('routes.categories'),
      path: routes.categories.root,
      disabled: false,
      hidden: !groups.organization.view,
    },
    {
      id: 'customFields',
      label: t('routes.customFields'),
      path: routes.customFields.root,
      disabled: false,
      hidden: !groups.organization.view,
    },
    {
      id: 'files',
      label: t('routes.files'),
      path: routes.files.root,
      disabled: false,
      hidden: !groups.redaction.view,
    },
    {
      id: 'members',
      label: t('routes.members'),
      path: routes.members.root,
      disabled: false,
      hidden: !groups.entities.view,
    },
    {
      id: 'menu',
      label: t('routes.menu'),
      path: routes.menu.root,
      disabled: false,
      hidden: !groups.organization.view,
    },
    {
      id: 'messages',
      label: t('routes.messages'),
      path: routes.messages.root,
      disabled: false,
      hidden: !groups.feedback.view,
    },
    {
      id: 'pages',
      label: t('routes.pages'),
      path: routes.pages.root,
      disabled: false,
      hidden: !groups.organization.view,
    },
    {
      id: 'settings',
      label: t('routes.settings'),
      path: routes.settings.root,
      disabled: false,
      hidden: !groups.organization.view,
    },
    {
      id: 'tags',
      label: t('routes.tags'),
      path: routes.tags.root,
      disabled: false,
      hidden: !groups.redaction.view,
    },
    {
      id: 'translations',
      label: t('routes.translations'),
      path: routes.translations.root,
      disabled: false,
      hidden: !groups.organization.view,
    },
    {
      id: 'users',
      label: t('routes.users'),
      path: routes.users.root,
      disabled: false,
      hidden: !groups.entities.view,
    },
  ];
  */

  return {
    // main: mainMenu,
    main: mainMenuItems,
    locale: createLocaleMenu(),
  };
};
