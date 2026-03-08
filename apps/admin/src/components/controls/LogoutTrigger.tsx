import { useTranslation } from 'react-i18next';
import { IconPower } from '@tabler/icons-react';
import { useAppStore } from '../../store';
import { IconButtonPlus } from '../ui';
import { useUserLogout } from '../../hooks';

const LogoutTrigger = () => {
  const { t } = useTranslation(['common']);
  const { setConfirmDialog } = useAppStore();
  const { onLogout } = useUserLogout();

  return (
    <IconButtonPlus
      tooltip={t('label.logOut')}
      onClick={() => {
        setConfirmDialog({
          title: t('message.confirm.logout.title'),
          content: t('message.confirm.logout.content'),
          onConfirm: onLogout,
        });
      }}
    >
      <IconPower />
    </IconButtonPlus>
  );
};

export default LogoutTrigger;
