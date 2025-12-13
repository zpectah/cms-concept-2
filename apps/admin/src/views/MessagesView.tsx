import { useTranslation } from 'react-i18next';
import { modelKeys } from '@model';
import { getConfig } from '../config';
import { ViewLayout } from '../components';

const MessagesView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['views']);

  return (
    <ViewLayout
      model={modelKeys.messages}
      rootUrl={routes.messages.root}
      title={t('messages.title')}
    >
      ...MessagesView...
    </ViewLayout>
  );
};

export default MessagesView;
