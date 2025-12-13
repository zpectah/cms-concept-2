import { useTranslation } from 'react-i18next';
import { getConfig } from '../config';

export const useMenuItems = () => {
  const {
    routes,
    locales,
    cms: {
      admin: { locale },
    },
  } = getConfig();

  const { i18n } = useTranslation();

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

  const mainMenu = [
    {
      id: 'articles',
      label: 'Articles',
      path: routes.articles.root,
      disabled: false,
      hidden: false,
    },
    {
      id: 'categories',
      label: 'Categories',
      path: routes.categories.root,
      disabled: false,
      hidden: false,
    },
    {
      id: 'customFields',
      label: 'Custom fields',
      path: routes.customFields.root,
      disabled: false,
      hidden: false,
    },
    {
      id: 'files',
      label: 'Files',
      path: routes.files.root,
      disabled: false,
      hidden: false,
    },
    {
      id: 'members',
      label: 'Members',
      path: routes.members.root,
      disabled: false,
      hidden: false,
    },
    {
      id: 'menu',
      label: 'Menu',
      path: routes.menu.root,
      disabled: false,
      hidden: false,
    },
    {
      id: 'messages',
      label: 'Messages',
      path: routes.messages.root,
      disabled: false,
      hidden: false,
    },
    {
      id: 'pages',
      label: 'Pages',
      path: routes.pages.root,
      disabled: false,
      hidden: false,
    },
    {
      id: 'settings',
      label: 'Settings',
      path: routes.settings.root,
      disabled: false,
      hidden: false,
    },
    {
      id: 'tags',
      label: 'Tags',
      path: routes.tags.root,
      disabled: false,
      hidden: false,
    },
    {
      id: 'translations',
      label: 'Translations',
      path: routes.translations.root,
      disabled: false,
      hidden: false,
    },
    {
      id: 'users',
      label: 'Users',
      path: routes.users.root,
      disabled: false,
      hidden: false,
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: routes.dashboard.root,
      disabled: false,
      hidden: false,
    },
    {
      id: 'login',
      label: 'Login',
      path: routes.login.root,
      disabled: false,
      hidden: false,
    },
    {
      id: 'passwordRecovery',
      label: 'Password recovery',
      path: routes.passwordRecovery.root,
      disabled: false,
      hidden: false,
    },
    {
      id: 'demo',
      label: 'Demo',
      path: routes.demo.root,
      disabled: false,
      hidden: false,
    },
  ];

  return {
    main: mainMenu,
    locale: createLocaleMenu(),
  };
};
