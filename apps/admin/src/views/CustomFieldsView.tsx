import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { modelKeys } from '@model';
import { getConfig } from '../config';
import { NewItemButton, ViewLayout } from '../components';

const CustomFieldsView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['views']);

  return (
    <ViewLayout
      model={modelKeys.customFields}
      rootUrl={routes.customFields.root}
      title={t('customFields.title')}
      titleSlot={<NewItemButton model={modelKeys.customFields} />}
    >
      <Outlet />
    </ViewLayout>
  );
};

export default CustomFieldsView;
