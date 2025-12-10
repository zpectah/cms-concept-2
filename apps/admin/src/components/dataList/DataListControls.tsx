import { useMemo } from 'react';
import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { useDataListContext } from './DataList.context';
import { Input, TagSelect, OptionItem, ButtonProps } from '../ui';
import { dataListSortOrderKeys } from './enums';

const DataListControls = () => {
  const {
    query,
    setQuery,
    options,
    filter,
    setFilter,
    pagination,
    onOrderBy,
    sortBy,
    orderBy,
    keys,
  } = useDataListContext();

  const commonButtonProps: Partial<ButtonProps> = { size: 'sm' };

  const orderByActive = useMemo(
    () => keys?.order && keys?.order.length,
    [keys.order]
  );
  const filterByTypeActive = useMemo(
    () => options?.types && options?.types.length,
    [options.types]
  );
  const filterByCategoriesActive = useMemo(
    () => options?.categories && options?.categories.length,
    [options.categories]
  );
  const filterByTagsActive = useMemo(
    () => options?.tags && options?.tags.length,
    [options.tags]
  );

  const rowsPerPageOptionsList = useMemo(() => {
    const optionsList: OptionItem<number>[] = [];

    options.pages?.forEach((item) => {
      optionsList.push({
        id: String(item),
        value: item,
        label: item,
      });
    });

    return optionsList;
  }, [options.pages]);

  const orderByOptionsList = useMemo(() => {
    const optionsList: OptionItem<string>[] = [];

    keys.order?.forEach((item) => {
      optionsList.push({
        id: item,
        value: item,
        label: item, // TODO: i18n
      });
    });

    return optionsList;
  }, [keys.order]);

  const typesOptionsList = useMemo(() => {
    const optionsList: OptionItem<string>[] = [];

    options.types?.forEach((item) => {
      optionsList.push({
        id: item,
        value: item,
        label: item, // TODO: i18n
      });
    });

    return optionsList;
  }, [options.types]);

  const categoriesOptionsList = useMemo(() => {
    const optionsList: OptionItem<number>[] = [];

    options.categories?.forEach((item) => {
      optionsList.push({
        id: String(item.id),
        value: item.id,
        label: item.name,
      });
    });

    return optionsList;
  }, [options.categories]);

  const tagsOptionsList = useMemo(() => {
    const optionsList: OptionItem<number>[] = [];

    options.tags?.forEach((item) => {
      optionsList.push({
        id: String(item.id),
        value: item.id,
        label: item.name,
      });
    });

    return optionsList;
  }, [options.tags]);

  return (
    <div id="DataListControls">
      <div>
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search in list"
        />
      </div>
      <div>
        rows per page
        <TagSelect
          value={pagination.perPage}
          onChange={(value) => pagination.onPerPageChange(value as number)}
          options={rowsPerPageOptionsList}
          buttonProps={commonButtonProps}
        />
      </div>
      {orderByActive && (
        <div>
          sort & order
          <TagSelect
            value={sortBy}
            onChange={(value) => onOrderBy(value as string)}
            options={orderByOptionsList}
            buttonProps={commonButtonProps}
            renderSelectedValue={(option) => (
              <>
                {option.label}{' '}
                {orderBy === dataListSortOrderKeys.asc ? (
                  <IconSortAscending />
                ) : (
                  <IconSortDescending />
                )}
              </>
            )}
          />
        </div>
      )}
      {filterByTypeActive && (
        <div>
          filter: type
          <TagSelect
            value={filter.types}
            onChange={(value) => {
              setFilter({
                ...filter,
                types: value as string[],
              });
            }}
            options={typesOptionsList}
            buttonProps={commonButtonProps}
            multiple
          />
        </div>
      )}
      {filterByCategoriesActive && (
        <div>
          filter: categories
          <TagSelect
            value={filter.categories}
            onChange={(value) => {
              setFilter({
                ...filter,
                categories: value as number[],
              });
            }}
            options={categoriesOptionsList}
            buttonProps={commonButtonProps}
            multiple
          />
        </div>
      )}
      {filterByTagsActive && (
        <div>
          filter: tags
          <TagSelect
            value={filter.tags}
            onChange={(value) => {
              setFilter({
                ...filter,
                tags: value as number[],
              });
            }}
            options={tagsOptionsList}
            buttonProps={commonButtonProps}
            multiple
          />
        </div>
      )}
    </div>
  );
};

export default DataListControls;
