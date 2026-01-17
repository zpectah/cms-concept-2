import { useTranslation } from 'react-i18next';
import { Section } from '../../../components';
import SettingsLanguagesTable from './SettingsLanguagesTable';

const SettingsLanguages = () => {
  const { t } = useTranslation(['views']);

  return (
    <Section title={t('views:settings.languages.title')}>
      <SettingsLanguagesTable />
    </Section>
  );
};

export default SettingsLanguages;
