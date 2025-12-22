import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { modelKeys } from '@model';
import { getConfig } from '../config';
import { NewItemButton, ViewLayout } from '../components';

const MembersView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['views']);

  return (
    <ViewLayout
      model={modelKeys.members}
      rootUrl={routes.members.root}
      title={t('members.title')}
      titleSlot={<NewItemButton model={modelKeys.members} />}
    >
      <Outlet />
    </ViewLayout>
  );
};

export default MembersView;
