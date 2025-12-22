import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Stack, Card, CardContent, Badge } from '@mui/material';
import {
  IconSortAscending,
  IconSortDescending,
  IconSquareDashed,
  IconSquareDot,
  IconSquareCheck,
  IconEye,
  IconRosetteDiscountCheckFilled,
  IconTrash,
  IconTrashX,
  IconGhost3,
  IconGhostOff,
  IconAdjustments,
  IconVocabulary,
} from '@tabler/icons-react';
import { useAppStore } from '../../store';
import { useUserActions } from '../../hooks';
import {
  Button,
  IconButtonPlus,
  ButtonSelect,
  SearchInput,
  TagSelect,
  Drawer,
  OptionItem,
  IconButtonPlusProps,
} from '../ui';
import { useDataListContext } from './DataList.context';
import { dataListCheckboxStateKeys, dataListSortOrderKeys } from './enums';
import { dataListIconSizeDefault } from './constants';

const DataListControls = () => {
  const { t } = useTranslation(['common', 'form', 'model', 'components']);
  const { setConfirmDialog } = useAppStore();
  const {
    model,
    query,
    setQuery,
    options,
    filter,
    setFilter,
    onFilterReset,
    pagination,
    onOrderBy,
    sortBy,
    orderBy,
    keys,
    showDeleted,
    onToggleShowDeleted,
    rowsLength,
    selectedActions,
    selected,
    onSelectAll,
    controlsOpen,
    setControlsOpen,
  } = useDataListContext();
  const { actions: userActions } = useUserActions(model);

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
        label: t(`form:label.${item}`),
      });
    });

    return optionsList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys.order]);

  const typesOptionsList = useMemo(() => {
    const optionsList: OptionItem<string>[] = [];

    options.types?.forEach((item) => {
      optionsList.push({
        id: item,
        value: item,
        label: t(`model:type.${item}`),
      });
    });

    return optionsList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const checkboxState = useMemo(() => {
    if (selected.length === 0) return dataListCheckboxStateKeys.none;
    if (selected.length === rowsLength)
      return dataListCheckboxStateKeys.checked;

    return dataListCheckboxStateKeys.indeterminate;
  }, [selected, rowsLength]);

  const deleteConfirmHandler = useCallback(() => {
    setConfirmDialog({
      title: t('message.confirm.delete.title'),
      content: t('message.confirm.delete.content', {
        subject:
          selected.length +
          ' ' +
          t(`model:plurals.${model}.item`, {
            count: selected.length,
          }).toLowerCase(),
      }),
      context: 'delete',
      onConfirm: () => selectedActions?.onDeleteSelected?.(selected),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, selectedActions]);

  const deletePermanentConfirmHandler = useCallback(() => {
    setConfirmDialog({
      title: t('message.confirm.deletePermanent.title'),
      content: t('message.confirm.deletePermanent.content', {
        subject:
          selected.length +
          ' ' +
          t(`model:plurals.${model}.item`, {
            count: selected.length,
          }).toLowerCase(),
      }),
      context: 'delete',
      onConfirm: () => selectedActions?.onDeletePermanentSelected?.(selected),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, selectedActions]);

  const renderActions = useMemo(() => {
    const selectCheckIcon = {
      [dataListCheckboxStateKeys.none]: (
        <IconSquareDashed size={dataListIconSizeDefault} />
      ),
      [dataListCheckboxStateKeys.checked]: (
        <IconSquareCheck size={dataListIconSizeDefault} />
      ),
      [dataListCheckboxStateKeys.indeterminate]: (
        <IconSquareDot size={dataListIconSizeDefault} />
      ),
    };

    const actions = [
      {
        id: 'select',
        label: t('button.selectAll'),
        icon: selectCheckIcon[checkboxState],
        onClick: onSelectAll,
        disabled: false,
        hidden: false,
      },
      {
        id: 'deleted',
        label: showDeleted ? t('button.hideDeleted') : t('button.showDeleted'),
        icon: showDeleted ? (
          <IconGhostOff size={dataListIconSizeDefault} />
        ) : (
          <IconGhost3 size={dataListIconSizeDefault} />
        ),
        onClick: onToggleShowDeleted,
        disabled: false,
        hidden: !userActions.deletePermanent,
      },
      {
        id: 'toggle',
        label: t('button.items.toggle', {
          subject: t('plurals.items.item', { count: selected.length }),
        }),
        icon: <IconEye size={dataListIconSizeDefault} />,
        onClick: () => selectedActions?.onToggleSelected?.(selected),
        disabled: selected.length === 0 || !userActions.modify,
        hidden: !selectedActions?.onToggleSelected,
        badge: true,
      },
      {
        id: 'approve',
        label: t('button.items.approve', {
          subject: t('plurals.items.item', { count: selected.length }),
        }),
        icon: <IconRosetteDiscountCheckFilled size={dataListIconSizeDefault} />,
        onClick: () => selectedActions?.onApproveSelected?.(selected),
        disabled: selected.length === 0 || !userActions.approve,
        hidden: !selectedActions?.onApproveSelected,
        badge: true,
      },
      {
        id: 'read',
        label: t('button.items.read', {
          subject: t('plurals.items.item', { count: selected.length }),
        }),
        icon: <IconVocabulary size={dataListIconSizeDefault} />,
        onClick: () => selectedActions?.onReadSelected?.(selected),
        disabled: selected.length === 0 || !userActions.modify,
        hidden: !selectedActions?.onReadSelected,
        badge: true,
      },
      {
        id: 'delete',
        label: t('button.items.delete', {
          subject: t('plurals.items.item', { count: selected.length }),
        }),
        icon: <IconTrash size={dataListIconSizeDefault} />,
        onClick: deleteConfirmHandler,
        disabled: selected.length === 0 || !userActions.delete,
        hidden: !selectedActions?.onDeleteSelected,
        color: 'warning',
        badge: true,
      },
      {
        id: 'delete-permanent',
        label: t('button.items.deletePermanent', {
          subject: t('plurals.items.item', { count: selected.length }),
        }),
        icon: <IconTrashX size={dataListIconSizeDefault} />,
        onClick: deletePermanentConfirmHandler,
        disabled: selected.length === 0 || !userActions.deletePermanent,
        hidden: !selectedActions?.onDeletePermanentSelected || !showDeleted,
        color: 'error',
        badge: true,
      },
    ];

    return (
      <Stack direction="row" gap={1}>
        {actions.map(({ id, label, icon, hidden, color, badge, ...rest }) => {
          if (hidden) return null;

          const button = (
            <IconButtonPlus
              key={id}
              tooltip={label}
              color={
                color ? (color as IconButtonPlusProps['color']) : 'default'
              }
              {...rest}
            >
              {icon}
            </IconButtonPlus>
          );

          if (badge) {
            return (
              <Badge key={id} badgeContent={selected.length}>
                {button}
              </Badge>
            );
          }

          return button;
        })}
      </Stack>
    );
  }, [
    checkboxState,
    showDeleted,
    userActions,
    selected,
    selectedActions,
    deleteConfirmHandler,
    deletePermanentConfirmHandler,
    onSelectAll,
    onToggleShowDeleted,
  ]);

  return (
    <>
      <div id="data-list-controls">
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={12}>
                <SearchInput
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('components:dataList.label.search')}
                  fullWidth
                />
              </Grid>

              <Grid size={6}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  flexWrap="wrap"
                  gap={2}
                >
                  {renderActions}
                </Stack>
              </Grid>

              <Grid size={6}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  flexWrap="wrap"
                  gap={2}
                >
                  <ButtonSelect
                    value={pagination.perPage}
                    onChange={(value) =>
                      pagination.onPerPageChange(value as number)
                    }
                    options={rowsPerPageOptionsList}
                    buttonProps={{
                      color: 'inherit',
                      size: 'small',
                    }}
                  />

                  <IconButtonPlus
                    tooltip={t('components:dataList.button.openControls')}
                    onClick={() => setControlsOpen(true)}
                  >
                    <IconAdjustments size={dataListIconSizeDefault} />
                  </IconButtonPlus>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>

      <Drawer
        anchor="right"
        width={{
          xs: '100%',
          sm: '350px',
        }}
        title={t('components:dataList.label.controls')}
        open={controlsOpen}
        onClose={() => setControlsOpen(!controlsOpen)}
        actions={
          <Button variant="outlined" onClick={onFilterReset}>
            {t('button.resetFilter')}
          </Button>
        }
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            {orderByActive && (
              <TagSelect
                label={t('components:dataList.label.sortOrder')}
                value={sortBy}
                onChange={(value) => onOrderBy(value as string)}
                options={orderByOptionsList}
                renderSelectedIcon={() =>
                  orderBy === dataListSortOrderKeys.asc ? (
                    <IconSortAscending size="1rem" />
                  ) : (
                    <IconSortDescending size="1rem" />
                  )
                }
              />
            )}
          </Grid>

          <Grid size={12}>
            {filterByTypeActive && (
              <TagSelect
                label={t('components:dataList.label.filterType')}
                value={filter.types}
                onChange={(value) => {
                  setFilter({
                    ...filter,
                    types: value as string[],
                  });
                }}
                options={typesOptionsList}
                multiple
              />
            )}
          </Grid>

          <Grid size={12}>
            {filterByCategoriesActive && (
              <TagSelect
                label={t('components:dataList.label.filterCategories')}
                value={filter.categories}
                onChange={(value) => {
                  setFilter({
                    ...filter,
                    categories: value as number[],
                  });
                }}
                options={categoriesOptionsList}
                multiple
              />
            )}
          </Grid>

          <Grid size={12}>
            {filterByTagsActive && (
              <TagSelect
                label={t('components:dataList.label.filterTags')}
                value={filter.tags}
                onChange={(value) => {
                  setFilter({
                    ...filter,
                    tags: value as number[],
                  });
                }}
                options={tagsOptionsList}
                multiple
              />
            )}
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
};

export default DataListControls;
