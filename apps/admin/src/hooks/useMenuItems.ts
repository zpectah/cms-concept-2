import { getConfig } from '../config';

export const useMenuItems = () => {
  const { routes } = getConfig();

  const primaryMenu = [
    {
      id: '1',
      label: 'Articles',
      path: routes.articles.root,
      disabled: false,
      hidden: false,
    },
    {
      id: '2',
      label: 'Categories',
      path: routes.categories.root,
      disabled: false,
      hidden: false,
    },
    {
      id: '3',
      label: 'Custom fields',
      path: routes.customFields.root,
      disabled: false,
      hidden: false,
    },
    {
      id: '4',
      label: 'Files',
      path: routes.files.root,
      disabled: false,
      hidden: false,
    },
    {
      id: '5',
      label: 'Members',
      path: routes.members.root,
      disabled: false,
      hidden: false,
    },
    {
      id: '6',
      label: 'Menu',
      path: routes.menu.root,
      disabled: false,
      hidden: false,
    },
    {
      id: '7',
      label: 'Messages',
      path: routes.messages.root,
      disabled: false,
      hidden: false,
    },
    {
      id: '8',
      label: 'Pages',
      path: routes.pages.root,
      disabled: false,
      hidden: false,
    },
    {
      id: '9',
      label: 'Settings',
      path: routes.settings.root,
      disabled: false,
      hidden: false,
    },
    {
      id: '10',
      label: 'Tags',
      path: routes.tags.root,
      disabled: false,
      hidden: false,
    },
    {
      id: '11',
      label: 'Translations',
      path: routes.translations.root,
      disabled: false,
      hidden: false,
    },
    {
      id: '12',
      label: 'Users',
      path: routes.users.root,
      disabled: false,
      hidden: false,
    },
    {
      id: '13',
      label: 'Dashboard',
      path: routes.dashboard.root,
      disabled: false,
      hidden: false,
    },
    {
      id: '14',
      label: 'Login',
      path: routes.login.root,
      disabled: false,
      hidden: false,
    },
    {
      id: '15',
      label: 'Password recovery',
      path: routes.passwordRecovery.root,
      disabled: false,
      hidden: false,
    },
    {
      id: '16',
      label: 'Demo',
      path: routes.demo.root,
      disabled: false,
      hidden: false,
    },
  ];

  return {
    primary: primaryMenu,
  };
};
