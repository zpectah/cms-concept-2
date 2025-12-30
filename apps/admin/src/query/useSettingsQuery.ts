import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Settings } from '@model';
import { getConfig } from '../config';

const QUERY_KEY_BASE = 'settings';

export const useSettingsQuery = () => {
  const {
    api: { endpoints },
  } = getConfig();

  const settingsQuery = useQuery<unknown, unknown, Settings>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () =>
      axios.get(endpoints.settings).then((response) => response.data),
  });

  const patchMutation = useMutation<
    { rows: number },
    unknown,
    Partial<Settings>
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.settings}/patch`, data)
        .then((response) => response.data),
  });

  const localeInstallMutation = useMutation<
    { rows: number; locale: string; tables: string[] },
    unknown,
    { locale: string }
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-locale-install`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.settings}/locale-install`, data)
        .then((response) => response.data),
  });

  const localeDefaultMutation = useMutation<
    { rows: number; locale: string },
    unknown,
    { locale: string }
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-locale-default`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.settings}/locale-default`, data)
        .then((response) => response.data),
  });

  const localeToggleMutation = useMutation<
    { rows: number; locale: string },
    unknown,
    { locale: string }
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-locale-toggle`],
    mutationFn: (data) =>
      axios
        .patch(`${endpoints.settings}/locale-toggle`, data)
        .then((response) => response.data),
  });

  return {
    settingsQuery,
    settingsPatchMutation: patchMutation,
    settingsLocaleInstallMutation: localeInstallMutation,
    settingsLocaleDefaultMutation: localeDefaultMutation,
    settingsLocaleToggleMutation: localeToggleMutation,
  };
};
