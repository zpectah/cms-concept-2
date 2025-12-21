import { useCallback, useMemo } from 'react';
import { Grid, Stack, Card, CardContent, Badge } from '@mui/material';
import {
  IconSortAscending,
  IconSortDescending,
  IconSquareDashed,
  IconSquareDot,
  IconSquareCheck,
  IconEye,
  IconRosette,
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

const DataListControls = () => {
  const { setConfirmDialog } = useAppStore();
  const { actions: userActions } = useUserActions();
  const {
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

  const iconSize = '1.25rem';

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

  const checkboxState = useMemo(() => {
    if (selected.length === 0) return dataListCheckboxStateKeys.none;
    if (selected.length === rowsLength)
      return dataListCheckboxStateKeys.checked;

    return dataListCheckboxStateKeys.indeterminate;
  }, [selected, rowsLength]);

  const deleteConfirmHandler = useCallback(() => {
    setConfirmDialog({
      title: 'Confirm delete',
      content: `Are you sure you want delete ${selected.length} selected items?`,
      context: 'delete',
      onConfirm: () => selectedActions?.onDeleteSelected?.(selected),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, selectedActions]);

  const deletePermanentConfirmHandler = useCallback(() => {
    setConfirmDialog({
      title: 'Confirm permanent delete',
      content: `Are you sure you want permanent delete ${selected.length} selected items?`,
      context: 'delete',
      onConfirm: () => selectedActions?.onDeletePermanentSelected?.(selected),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, selectedActions]);

  const renderActions = useMemo(() => {
    const selectCheckIcon = {
      [dataListCheckboxStateKeys.none]: <IconSquareDashed size={iconSize} />,
      [dataListCheckboxStateKeys.checked]: <IconSquareCheck size={iconSize} />,
      [dataListCheckboxStateKeys.indeterminate]: (
        <IconSquareDot size={iconSize} />
      ),
    };

    const actions = [
      {
        id: 'select',
        label: 'Select all',
        icon: selectCheckIcon[checkboxState],
        onClick: onSelectAll,
        disabled: false,
        hidden: false,
      },
      {
        id: 'deleted',
        label: 'Show deleted',
        icon: showDeleted ? (
          <IconGhostOff size={iconSize} />
        ) : (
          <IconGhost3 size={iconSize} />
        ),
        onClick: onToggleShowDeleted,
        disabled: false,
        hidden: !userActions.deletePermanent,
      },
      {
        id: 'toggle',
        label: `Toggle ${selected.length} selected items`,
        icon: <IconEye size={iconSize} />,
        onClick: () => selectedActions?.onToggleSelected?.(selected),
        disabled: selected.length === 0 || !userActions.modify,
        hidden: !selectedActions?.onToggleSelected,
        color: 'primary',
        badge: true,
      },
      {
        id: 'approve',
        label: `Approve ${selected.length} selected items`,
        icon: <IconRosette size={iconSize} />,
        onClick: () => selectedActions?.onApproveSelected?.(selected),
        disabled: selected.length === 0 || !userActions.approve,
        hidden: !selectedActions?.onApproveSelected,
        color: 'primary',
        badge: true,
      },
      {
        id: 'read',
        label: `Mark read ${selected.length} selected items`,
        icon: <IconVocabulary size={iconSize} />,
        onClick: () => selectedActions?.onReadSelected?.(selected),
        disabled: selected.length === 0 || !userActions.modify,
        hidden: !selectedActions?.onReadSelected,
        color: 'primary',
        badge: true,
      },
      {
        id: 'delete',
        label: `Delete ${selected.length} selected items`,
        icon: <IconTrash size={iconSize} />,
        onClick: deleteConfirmHandler,
        disabled: selected.length === 0 || !userActions.delete,
        hidden: !selectedActions?.onDeleteSelected,
        color: 'warning',
        badge: true,
      },
      {
        id: 'delete-permanent',
        label: `Permanent delete ${selected.length} selected items`,
        icon: <IconTrashX size={iconSize} />,
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
                  placeholder="Type to search in list"
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
                    tooltip="Open controls"
                    onClick={() => setControlsOpen(true)}
                  >
                    <IconAdjustments size={iconSize} />
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
        title="Table controls"
        open={controlsOpen}
        onClose={() => setControlsOpen(!controlsOpen)}
        actions={
          <Button variant="outlined" onClick={onFilterReset}>
            Reset filter
          </Button>
        }
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            {orderByActive && (
              <TagSelect
                label="Sort and order"
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
                label="Filter by type"
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
                label="Filter by categories"
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
                label="Filter by tags"
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
