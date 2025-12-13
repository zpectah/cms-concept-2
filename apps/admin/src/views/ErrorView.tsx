import { useTranslation } from 'react-i18next';
import { CONTAINER_WIDTH_CENTERED } from '../constants';
import { ViewLayout } from '../components';

interface ErrorViewProps {
  code?: number;
}

const ErrorView = ({ code }: ErrorViewProps) => {
  const { t } = useTranslation(['views']);

  return (
    <ViewLayout
      variant="centered"
      containerWidth={CONTAINER_WIDTH_CENTERED}
      rootUrl={null}
      title={t('error.title', { code })}
    >
      ...ErrorView...
    </ViewLayout>
  );
};

export default ErrorView;
