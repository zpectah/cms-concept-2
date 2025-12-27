import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store';

export const useResponseMessage = () => {
  const { t } = useTranslation();
  const { addToast } = useAppStore();

  const onError = (error: unknown) => {
    addToast({
      title: t('message.error.common'),
      severity: 'error',
    });
    console.warn(error);
  };

  return {
    onError,
  };
};
