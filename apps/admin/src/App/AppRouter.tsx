import { lazy } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import { getConfig } from '../config';
import { AppLayout, AuthLayout } from '../components';
import {
  ConfirmDialog,
  ProfileDialogForm,
  Toasts,
  Announcements,
} from '../modules';
import {
  ArticlesView,
  CategoriesView,
  CustomFieldsView,
  DashboardView,
  DemoView,
  ErrorBoundary,
  ErrorView,
  FilesView,
  LoginView,
  MembersView,
  MenuView,
  MessagesView,
  PagesView,
  PasswordRecoveryView,
  SettingsView,
  TagsView,
  TranslationsView,
  UsersView,
} from '../views';

const ArticlesList = lazy(
  () => import('../modules/Articles/ArticlesList/ArticlesList')
);
const CategoriesList = lazy(
  () => import('../modules/Categories/CategoriesList/CategoriesList')
);
const CustomFieldsList = lazy(
  () => import('../modules/CustomFields/CustomFieldsList/CustomFieldsList')
);
const FilesList = lazy(() => import('../modules/Files/FilesList/FilesList'));
const MembersList = lazy(
  () => import('../modules/Members/MembersList/MembersList')
);
const MenuList = lazy(() => import('../modules/Menu/MenuList/MenuList'));
const MessagesList = lazy(
  () => import('../modules/Messages/MessagesList/MessagesList')
);
const PagesList = lazy(() => import('../modules/Pages/PagesList/PagesList'));
const TagsList = lazy(() => import('../modules/Tags/TagsList/TagsList'));
const TranslationsList = lazy(
  () => import('../modules/Translations/TranslationsList/TranslationsList')
);
const UsersList = lazy(() => import('../modules/Users/UsersList/UsersList'));
const SettingsGlobalForm = lazy(
  () => import('../modules/Settings/SettingsGlobalForm/SettingsGlobalForm')
);
const SettingsClientForm = lazy(
  () => import('../modules/Settings/SettingsClientForm/SettingsClientForm')
);
const SettingsLanguages = lazy(
  () => import('../modules/Settings/SettingsLanguages/SettingsLanguages')
);
const SettingsBlacklist = lazy(
  () => import('../modules/Settings/SettingsBlacklist/SettingsBlacklist')
);

const AppRouter = () => {
  const { routes } = getConfig();

  const router = createBrowserRouter([
    {
      element: (
        <AppLayout
          variant="minimal"
          slots={{
            announcements: <Announcements />,
            toasts: <Toasts />,
            confirmDialog: <ConfirmDialog />,
          }}
        />
      ),
      errorElement: <ErrorBoundary />,
      children: [
        // Error 404
        {
          path: '*',
          element: <ErrorView code={404} />,
        },

        // Login
        {
          path: routes.login.root,
          element: <LoginView />,
        },

        // Password recovery
        {
          path: routes.passwordRecovery.root,
          element: <PasswordRecoveryView />,
          children: [
            {
              path: routes.passwordRecovery.token,
              element: <PasswordRecoveryView />,
            },
          ],
        },

        // Basic redirect
        {
          path: routes.base.root,
          element: <Navigate replace to={routes.login.root} />,
        },
      ],
    },

    {
      element: <AuthLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          element: (
            <AppLayout
              slots={{
                announcements: <Announcements />,
                toasts: <Toasts />,
                confirmDialog: <ConfirmDialog />,
                profile: <ProfileDialogForm />,
              }}
            />
          ),
          children: [
            // Demo
            {
              path: routes.demo.root,
              element: <DemoView />,
            },

            // Dashboard
            {
              path: routes.dashboard.root,
              element: <DashboardView />,
            },

            // Settings
            {
              path: routes.settings.root,
              element: <SettingsView />,
              children: [
                {
                  index: true,
                  element: (
                    <Navigate
                      replace
                      to={`${routes.settings.root}/${routes.settings.panels.global}`}
                    />
                  ),
                },
                {
                  path: routes.settings.panels.global,
                  element: <SettingsGlobalForm />,
                },
                {
                  path: routes.settings.panels.client,
                  element: <SettingsClientForm />,
                },
                {
                  path: routes.settings.panels.locales,
                  element: <SettingsLanguages />,
                },
                {
                  path: routes.settings.panels.blacklist,
                  element: <SettingsBlacklist />,
                },
              ],
            },

            // Articles
            {
              path: routes.articles.root,
              element: <ArticlesView />,
              children: [
                {
                  index: true,
                  element: <ArticlesList />,
                },
                {
                  path: routes.articles.detail,
                  element: <ArticlesList />,
                },
              ],
            },

            // Categories
            {
              path: routes.categories.root,
              element: <CategoriesView />,
              children: [
                {
                  index: true,
                  element: <CategoriesList />,
                },
                {
                  path: routes.categories.detail,
                  element: <CategoriesList />,
                },
              ],
            },

            // CustomFields
            {
              path: routes.customFields.root,
              element: <CustomFieldsView />,
              children: [
                {
                  index: true,
                  element: <CustomFieldsList />,
                },
                {
                  path: routes.customFields.detail,
                  element: <CustomFieldsList />,
                },
              ],
            },

            // Files
            {
              path: routes.files.root,
              element: <FilesView />,
              children: [
                {
                  index: true,
                  element: <FilesList />,
                },
                {
                  path: routes.files.upload,
                  element: <FilesList />,
                },
                {
                  path: routes.files.detail,
                  element: <FilesList />,
                },
              ],
            },

            // Members
            {
              path: routes.members.root,
              element: <MembersView />,
              children: [
                {
                  index: true,
                  element: <MembersList />,
                },
                {
                  path: routes.members.detail,
                  element: <MembersList />,
                },
              ],
            },

            // Menu
            {
              path: routes.menu.root,
              element: <MenuView />,
              children: [
                {
                  index: true,
                  element: <MenuList />,
                },
                {
                  path: routes.menu.detail,
                  element: <MenuList />,
                },
              ],
            },

            // Messages
            {
              path: routes.messages.root,
              element: <MessagesView />,
              children: [
                {
                  index: true,
                  element: <MessagesList />,
                },
                {
                  path: routes.messages.detail,
                  element: <MessagesList />,
                },
              ],
            },

            // Pages
            {
              path: routes.pages.root,
              element: <PagesView />,
              children: [
                {
                  index: true,
                  element: <PagesList />,
                },
                {
                  path: routes.pages.detail,
                  element: <PagesList />,
                },
              ],
            },

            // Tags
            {
              path: routes.tags.root,
              element: <TagsView />,
              children: [
                {
                  index: true,
                  element: <TagsList />,
                },
                {
                  path: routes.tags.detail,
                  element: <TagsList />,
                },
              ],
            },

            // Translations
            {
              path: routes.translations.root,
              element: <TranslationsView />,
              children: [
                {
                  index: true,
                  element: <TranslationsList />,
                },
                {
                  path: routes.translations.detail,
                  element: <TranslationsList />,
                },
              ],
            },

            // Users
            {
              path: routes.users.root,
              element: <UsersView />,
              children: [
                {
                  index: true,
                  element: <UsersList />,
                },
                {
                  path: routes.users.detail,
                  element: <UsersList />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
