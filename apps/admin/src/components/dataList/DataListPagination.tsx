import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Card, CardContent } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { IconButtonPlus, IconButtonPlusProps } from '../ui';
import { useDataListContext } from './DataList.context';

const DataListPagination = () => {
  const { t } = useTranslation(['common']);
  const {
    pagination: {
      page,
      pages,
      onPageFirst,
      onPagePrev,
      onPageNext,
      onPageLast,
      onPageChange,
      disabledButton,
    },
  } = useDataListContext();

  const commonButtonProps: Partial<IconButtonPlusProps> = {
    size: 'small',
    // variant: 'outlined',
    // tooltipProps: { openDelay: 750 },
  };

  const renderPages = useMemo(() => {
    return [...Array(pages)].map((_, i) => {
      const p = i + 1;

      return (
        <IconButtonPlus
          key={`${p}`}
          onClick={() => onPageChange(p)}
          // variant={p === page ? 'outline' : 'ghost'}
          size="small"
          disabled={pages <= 1}
        >
          {p}
        </IconButtonPlus>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages, page]);

  return (
    <div id="DataListPagination">
      <Card>
        <CardContent>
          <Stack
            direction="row"
            gap={4}
            alignItems="center"
            justifyContent="center"
          >
            <Stack direction="row" gap={2}>
              <IconButtonPlus
                tooltip={t('button.firstPage')}
                onClick={onPageFirst}
                disabled={disabledButton.first}
                {...commonButtonProps}
              >
                <FirstPageIcon />
              </IconButtonPlus>
              <IconButtonPlus
                tooltip={t('button.prevPage')}
                onClick={onPagePrev}
                disabled={disabledButton.prev}
                {...commonButtonProps}
              >
                <ChevronLeftIcon />
              </IconButtonPlus>
            </Stack>
            <Stack direction="row" gap={2}>
              {renderPages}
            </Stack>
            <Stack direction="row" gap={2}>
              <IconButtonPlus
                tooltip={t('button.nextPage')}
                onClick={onPageNext}
                disabled={disabledButton.next}
                {...commonButtonProps}
              >
                <ChevronRightIcon />
              </IconButtonPlus>
              <IconButtonPlus
                tooltip={t('button.lastPage')}
                onClick={onPageLast}
                disabled={disabledButton.last}
                {...commonButtonProps}
              >
                <LastPageIcon />
              </IconButtonPlus>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataListPagination;
