import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Stack, Card } from '@chakra-ui/react';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronLeftPipe,
  IconChevronRightPipe,
} from '@tabler/icons-react';
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
    size: 'sm',
    variant: 'ghost',
    tooltipProps: { openDelay: 750 },
  };

  const renderPages = useMemo(() => {
    return [...Array(pages)].map((_, i) => {
      const p = i + 1;

      return (
        <IconButton
          key={`${p}`}
          onClick={() => onPageChange(p)}
          variant={p === page ? 'outline' : 'ghost'}
          size="sm"
          disabled={pages <= 1}
        >
          {p}
        </IconButton>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages, page]);

  return (
    <div id="DataListPagination">
      <Card.Root size="sm">
        <Card.Body>
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
                <IconChevronLeftPipe />
              </IconButtonPlus>
              <IconButtonPlus
                tooltip={t('button.prevPage')}
                onClick={onPagePrev}
                disabled={disabledButton.prev}
                {...commonButtonProps}
              >
                <IconChevronLeft />
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
                <IconChevronRight />
              </IconButtonPlus>
              <IconButtonPlus
                tooltip={t('button.lastPage')}
                onClick={onPageLast}
                disabled={disabledButton.last}
                {...commonButtonProps}
              >
                <IconChevronRightPipe />
              </IconButtonPlus>
            </Stack>
          </Stack>
        </Card.Body>
      </Card.Root>
    </div>
  );
};

export default DataListPagination;
