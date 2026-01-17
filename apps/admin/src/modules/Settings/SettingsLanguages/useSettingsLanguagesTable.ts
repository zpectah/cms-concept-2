import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getConfig } from '../../../config';
import { ProjectLocales } from '../../../types';
import { useAppStore } from '../../../store';
import { useSettingsQuery } from '../../../query';
import { useResponseMessage } from '../../../hooks';

export const useSettingsLanguagesTable = () => {
  const [isInstalling, setIsInstalling] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const { locales } = getConfig();
  const { t } = useTranslation(['common', 'views']);
  const { addToast, setConfirmDialog } = useAppStore();
  const { onError } = useResponseMessage();
  const {
    settingsQuery,
    settingsLocaleInstallMutation,
    settingsLocaleToggleMutation,
    settingsLocaleDefaultMutation,
  } = useSettingsQuery();

  const {
    data: settingsData,
    refetch,
    isLoading,
    isRefetching,
  } = settingsQuery;
  const { mutate: onLocaleInstall } = settingsLocaleInstallMutation;
  const { mutate: onLocaleToggle } = settingsLocaleToggleMutation;
  const { mutate: onLocaleDefault } = settingsLocaleDefaultMutation;

  const localeInstallConfirmHandler = (locale: string) => {
    setIsInstalling(locale);

    const master = Object.assign({ locale });

    onLocaleInstall(master, {
      onSuccess: (res) => {
        addToast({
          title: t(
            'views:settings.languages.messages.success.locale_installed',
            { locale }
          ),
          severity: 'success',
          autoclose: true,
        });
        setIsInstalling(null);
        refetch();
      },
      onError: (err) => {
        onError(err);
        setIsInstalling(null);
      },
    });
  };

  const localeInstallHandler = (locale: string) => {
    setConfirmDialog({
      title: t('views:settings.languages.messages.confirm.install.title'),
      content: t('views:settings.languages.messages.confirm.install.content', {
        locale,
      }),
      onConfirm: () => localeInstallConfirmHandler(locale),
      context: 'default',
    });
  };

  const localeToggleHandler = (locale: string) => {
    setIsUpdating(locale);

    onLocaleToggle(
      { locale },
      {
        onSuccess: (res) => {
          addToast({
            title: t(
              'views:settings.languages.messages.success.locale_updated',
              { locale }
            ),
            severity: 'success',
            autoclose: true,
          });
          setIsUpdating(null);
          refetch();
        },
        onError: (err) => {
          onError(err);
          setIsUpdating(null);
        },
      }
    );
  };

  const localeDefaultHandler = (locale: string) => {
    setIsUpdating(locale);

    onLocaleDefault(
      { locale },
      {
        onSuccess: (res) => {
          addToast({
            title: t(
              'views:settings.languages.messages.success.locale_updated',
              { locale }
            ),
            severity: 'success',
            autoclose: true,
          });
          setIsUpdating(null);
          refetch();
        },
        onError: (err) => {
          onError(err);
          setIsUpdating(null);
        },
      }
    );
  };

  const isLocaleInstalled = useCallback(
    (locale: string) =>
      !isLoading &&
      settingsData &&
      settingsData?.locales &&
      settingsData?.locales.installed.indexOf(locale) > -1,
    [isLoading, settingsData]
  );

  const isLocaleActive = useCallback(
    (locale: string) =>
      !isLoading &&
      settingsData &&
      settingsData?.locales &&
      settingsData?.locales.active.indexOf(locale) > -1,
    [isLoading, settingsData]
  );

  const isLocaleDefault = useCallback(
    (locale: string) =>
      !isLoading &&
      settingsData &&
      settingsData?.locales &&
      settingsData?.locales.default === locale,
    [isLoading, settingsData]
  );

  return {
    availableLocales: locales as ProjectLocales,
    availableLocalesList: Object.keys(locales),
    locales: settingsData?.locales,
    isLoading: isLoading ?? isRefetching,
    isLocaleInstalled,
    isLocaleActive,
    isLocaleDefault,
    isInstalling,
    isUpdating,
    onLocaleInstall: localeInstallHandler,
    onLocaleToggle: localeToggleHandler,
    onLocaleDefault: localeDefaultHandler,
  };
};
