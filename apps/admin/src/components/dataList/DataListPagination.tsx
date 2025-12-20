import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Card, CardContent } from '@mui/material';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronLeftPipe,
  IconChevronRightPipe,
} from '@tabler/icons-react';
import { Button, IconButtonPlus, IconButtonPlusProps } from '../ui';
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
  };

  const renderPages = useMemo(() => {
    const pageNumbers: (string | number)[] = [];
    const range = 2;

    for (let i = 1; i <= pages; i++) {
      if (i === 1 || i === pages || (i >= page - range && i <= page + range)) {
        pageNumbers.push(i);
      } else if (i === page - range - 1 || i === page + range + 1) {
        pageNumbers.push('...');
      }
    }

    return pageNumbers.map((p, index) => {
      if (p === '...') {
        return (
          <span key={`ellipsis-${index}`} style={{ padding: '0 8px' }}>
            ...
          </span>
        );
      }

      return (
        <Button
          key={p}
          onClick={() => onPageChange(p as number)}
          variant={p === page ? 'contained' : 'text'}
          color="inherit"
          size="small"
          disabled={pages <= 1}
          sx={{ minWidth: 'auto', pl: 1.75, pr: 1.75 }}
        >
          {p}
        </Button>
      );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages, page]);

  return (
    <div id="data-list-pagination">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default DataListPagination;
