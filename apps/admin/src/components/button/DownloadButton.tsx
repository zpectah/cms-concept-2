import { useTranslation } from 'react-i18next';
import { IconDownload } from '@tabler/icons-react';
import { useDownloadFile } from '../../hooks';
import { Button, ButtonProps } from '../ui';
import { DownloadButtonProps } from './types';

const DownloadButton = ({
  source,
  filename,
  renderButton,
  buttonProps,
  label,
}: DownloadButtonProps) => {
  const { t } = useTranslation(['common']);
  const { onDownload, isLoading } = useDownloadFile();

  const downloadHandler = () => onDownload(source, filename);

  const finalLabel = label ? label : t('common:button.download');
  const finalButtonProps = {
    onClick: downloadHandler,
    loading: isLoading,
    startIcon: <IconDownload size="1rem" />,
    ...buttonProps,
  } as ButtonProps;

  return (
    <>
      {renderButton && <>{renderButton(finalButtonProps)}</>}
      <Button variant="outlined" color="secondary" {...finalButtonProps}>
        {finalLabel}
      </Button>
    </>
  );
};

export default DownloadButton;
