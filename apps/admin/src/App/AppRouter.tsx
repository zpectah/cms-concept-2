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
                      to={`/${routes.settings.root}/${routes.settings.panels.global}`}
                    />
                  ),
                },
                {
                  path: routes.settings.panel,
                  element: <SettingsView />,
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
                  element: <ArticlesView />,
                },
                {
                  path: routes.articles.detail,
                  element: <ArticlesView />,
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
                  element: <CategoriesView />,
                },
                {
                  path: routes.categories.detail,
                  element: <CategoriesView />,
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
                  element: <CustomFieldsView />,
                },
                {
                  path: routes.customFields.detail,
                  element: <CustomFieldsView />,
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
                  element: <FilesView />,
                },
                {
                  path: routes.files.detail,
                  element: <FilesView />,
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
                  element: <MembersView />,
                },
                {
                  path: routes.members.detail,
                  element: <MembersView />,
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
                  element: <MenuView />,
                },
                {
                  path: routes.menu.detail,
                  element: <MenuView />,
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
                  element: <MessagesView />,
                },
                {
                  path: routes.messages.detail,
                  element: <MessagesView />,
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
                  element: <PagesView />,
                },
                {
                  path: routes.pages.detail,
                  element: <PagesView />,
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
                  element: <TagsView />,
                },
                {
                  path: routes.tags.detail,
                  element: <TagsView />,
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
                  element: <TranslationsView />,
                },
                {
                  path: routes.translations.detail,
                  element: <TranslationsView />,
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
                  element: <UsersView />,
                },
                {
                  path: routes.users.detail,
                  element: <UsersView />,
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
