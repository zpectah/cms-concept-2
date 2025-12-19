import { useState, useMemo, useCallback } from 'react';
import { CommonModelItem } from '@model';
import {
  UseDataListPaginationProps,
  UseDataListPaginationReturn,
} from './types';
import { dataListRowsPerPageDefault } from './constants';

export const useDataListPagination = <T extends CommonModelItem>({
  rows,
}: UseDataListPaginationProps<T>): UseDataListPaginationReturn<T> => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(dataListRowsPerPageDefault);

  const pages = useMemo(
    () => Math.max(1, Math.ceil(rows.length / perPage)),
    [rows.length, perPage]
  );

  const pageChangeHandler = (page: number) => {
    setPage(page);
  };

  const perPageChangeHandler = (perPage: number) => {
    setPerPage(perPage);
    setPage(1);
  };

  const pageFirstHandler = () => pageChangeHandler(1);
  const pagePrevHandler = useCallback(
    () => pageChangeHandler(Math.max(page - 1, 1)),
    [page]
  );
  const pageNextHandler = useCallback(
    () => pageChangeHandler(Math.min(page + 1, pages)),
    [page, pages]
  );
  const pageLastHandler = useCallback(() => pageChangeHandler(pages), [pages]);

  const isFirstDisabled = useMemo(() => page === 1, [page]);
  const isLastDisabled = useMemo(() => page === pages, [page, pages]);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * perPage;

    return rows.slice(start, start + perPage);
  }, [rows, page, perPage]);

  return {
    onPageChange: pageChangeHandler,
    onPerPageChange: perPageChangeHandler,
    onPageFirst: pageFirstHandler,
    onPagePrev: pagePrevHandler,
    onPageNext: pageNextHandler,
    onPageLast: pageLastHandler,
    page,
    pages,
    perPage,
    disabledButton: {
      first: isFirstDisabled,
      prev: isFirstDisabled,
      next: isLastDisabled,
      last: isLastDisabled,
    },
    rows: paginatedRows,
  };
};
