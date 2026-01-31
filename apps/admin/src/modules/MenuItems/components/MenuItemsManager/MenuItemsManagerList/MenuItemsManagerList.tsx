import { useTranslation } from 'react-i18next';
import { Grid, Paper, Stack, Box } from '@mui/material';
import {
  IconEye,
  IconEyeOff,
  IconTrash,
  IconTrashOff,
  IconPencil,
} from '@tabler/icons-react';
import { SPACING } from '../../../../../constants';
import { NewButton, IconButtonPlus } from '../../../../../components';
import { useMenuItemsManagerList } from './useMenuItemsManagerList';
import { useMenuItemsManagerContext } from '../MenuItemsManager.context';
import { MenuItemsManagerListItemProps } from './types';

const ICON_SIZE = '1rem';

const MenuItemsManagerListItem = ({
  id,
  name,
  children,
  item_order,
  onDetail,
  onToggle,
  onDelete,
  ...item
}: MenuItemsManagerListItemProps) => {
  const { t } = useTranslation(['common']);

  const rowActions = [
    {
      id: 'delete',
      onClick: () => onDelete(id),
      tooltip: item.deleted ? t('button.undelete') : t('button.delete'),
      children: item.deleted ? (
        <IconTrashOff size={ICON_SIZE} />
      ) : (
        <IconTrash size={ICON_SIZE} />
      ),
    },
    {
      id: 'toggle',
      onClick: () => onToggle(id),
      tooltip: t('button.toggle'),
      children: item.active ? (
        <IconEye size={ICON_SIZE} />
      ) : (
        <IconEyeOff size={ICON_SIZE} />
      ),
    },
    {
      id: 'detail',
      onClick: () => onDetail(id),
      tooltip: t('button.detail'),
      children: <IconPencil size={ICON_SIZE} />,
    },
  ];

  return (
    <>
      <Paper variant="outlined" sx={{ p: 1, pl: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" gap={1} alignItems="center">
            <span>{name}</span>
          </Stack>
          <Stack
            direction="row"
            gap={1}
            justifyContent="flex-end"
            alignItems="center"
          >
            {rowActions.map((row) => (
              <IconButtonPlus key={row.id} {...row} />
            ))}
          </Stack>
        </Stack>
      </Paper>
      {children.length > 0 && (
        <Stack direction="column" gap={1} sx={{ pl: 1 }}>
          {children.map(({ children, ...sub }) => (
            <MenuItemsManagerListItem
              key={`${id}.${sub.uid}`}
              onDetail={onDetail}
              onToggle={onToggle}
              onDelete={onDelete}
              children={children}
              {...sub}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

const MenuItemsManagerList = () => {
  const { t } = useTranslation(['common']);
  const { items } = useMenuItemsManagerList();
  const {
    setDetailOpen,
    rowActions: { onDetail, onToggle, onDelete },
  } = useMenuItemsManagerContext();

  return (
    <Grid container size={12}>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={SPACING.form}>
          <Grid size={12}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <NewButton onClick={() => setDetailOpen('new')}>
                {t('button.new.menuItems')}
              </NewButton>
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack direction="column" gap={1}>
              {items.map(({ children, ...item }) => (
                <MenuItemsManagerListItem
                  key={item.uid}
                  onDetail={onDetail}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  children={children}
                  {...item}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default MenuItemsManagerList;
