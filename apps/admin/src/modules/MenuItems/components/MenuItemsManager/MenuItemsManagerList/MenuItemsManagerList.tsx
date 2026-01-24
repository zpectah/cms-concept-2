import { Grid, Paper, Stack, Box } from '@mui/material';
import { SPACING } from '../../../../../constants';
import { Button } from '../../../../../components';
import { useMenuItemsManagerList } from './useMenuItemsManagerList';
import { useMenuItemsManagerContext } from '../MenuItemsManager.context';
import { MenuItemsManagerListItemProps } from './types';

const MenuItemsManagerListItem = ({
  id,
  name,
  children,
  item_order,
  onDetail,
  onToggle,
  onDelete,
}: MenuItemsManagerListItemProps) => {
  return (
    <>
      <Paper variant="outlined" sx={{ p: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack>
            <small>{item_order}.</small>
            <span>{name}</span>
          </Stack>
          <Stack direction="row" gap={1} justifyContent="flex-end">
            <button type="button" onClick={() => onDelete(id)}>
              delete
            </button>
            <button type="button" onClick={() => onToggle(id)}>
              toggle
            </button>
            <button type="button" onClick={() => onDetail(id)}>
              detail
            </button>
          </Stack>
        </Stack>
      </Paper>
      {children.length > 0 && (
        <Stack direction="column" gap={1} sx={{ pl: 1 }}>
          {children.map(({ children, ...sub }) => (
            <MenuItemsManagerListItem
              key={sub.id}
              onDetail={() => onDetail(sub.id)}
              onToggle={onToggle}
              children={children}
              onDelete={onDelete}
              {...sub}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

const MenuItemsManagerList = () => {
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
              <Button
                variant="contained"
                color="success"
                onClick={() => setDetailOpen('new')}
              >
                New menu item
              </Button>
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
