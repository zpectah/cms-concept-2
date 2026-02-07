import { useTranslation } from 'react-i18next';
import { Grid, Paper, Stack, Box, Typography } from '@mui/material';
import {
  IconEye,
  IconEyeOff,
  IconPencil,
  IconTrash,
  IconTrashOff,
  IconMessageReply,
} from '@tabler/icons-react';
import {
  IconButtonPlus,
  NewButton,
  DateValue,
} from '../../../../../components';
import { SPACING } from '../../../../../constants';
import { useCommentsManagerContext } from '../CommentsManager.context';
import { useCommentsManagerList } from './useCommentsManagerList';
import { CommentsManagerListItemProps } from './types';

const ICON_SIZE = '1rem';

const CommentsManagerListItem = ({
  id,
  sender,
  subject,
  content,
  children,
  onDetail,
  onToggle,
  onDelete,
  onReply,
  created,
  ...item
}: CommentsManagerListItemProps) => {
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
      id: 'reply',
      onClick: () => onReply('new', id),
      tooltip: t('button.reply'),
      children: <IconMessageReply size={ICON_SIZE} />,
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
        <Stack direction="column" gap={1}>
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Stack direction="column" gap={1}>
              <Typography>{subject}</Typography>
              <Typography fontSize="small" color="textDisabled">
                {sender}
                &nbsp;|&nbsp;
                <DateValue
                  value={created}
                  typographyProps={{ component: 'span' }}
                />
              </Typography>
            </Stack>
            <Stack direction="row" gap={1}>
              {rowActions.map((row) => (
                <IconButtonPlus key={row.id} {...row} />
              ))}
            </Stack>
          </Stack>
          <Stack direction="column">
            <Typography>{content}</Typography>
          </Stack>
        </Stack>
      </Paper>
      {children.length > 0 && (
        <Stack direction="column" gap={1} sx={{ pl: 1 }}>
          {children.map(({ children, ...sub }) => (
            <CommentsManagerListItem
              key={`${id}.${sub.id}`}
              onDetail={onDetail}
              onToggle={onToggle}
              onDelete={onDelete}
              children={children}
              onReply={onReply}
              {...sub}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

const CommentsManagerList = () => {
  const { t } = useTranslation(['common']);
  const { items } = useCommentsManagerList();
  const {
    rowActions: { onDetail, onToggle, onDelete },
  } = useCommentsManagerContext();

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
              <NewButton
                variant="outlined"
                size="small"
                onClick={() => onDetail('new')}
              >
                {t('button.new.comments')}
              </NewButton>
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack direction="column" gap={1}>
              {items.map(({ children, ...item }) => (
                <CommentsManagerListItem
                  key={item.id}
                  onDetail={onDetail}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onReply={onDetail}
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

export default CommentsManagerList;
