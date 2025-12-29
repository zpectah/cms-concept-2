import { useCallback } from 'react';
import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IconWindowMaximize, IconWindowMinimize } from '@tabler/icons-react';
import { useAppStore } from '../../store';
import { useViewContext } from '../../contexts';
import { modalCloseReasonKeys } from '../../enums';
import { ModalCloseReason } from '../../types';
import { useUserActions } from '../../hooks';
import { DETAIL_DEFAULT_DRAWER_WIDTH_DEFAULT } from '../../constants';
import { Button, DrawerBase, DrawerLayout, ButtonProps } from '../ui';
import { ControlledForm } from '../form';
import { DetailDrawerProps } from './types';
import { DetailDrawerContextProvider } from './DetailDrawer.context';
import { useDetailDrawer } from './useDetailDrawer';

const DetailDrawer = <T extends FieldValues>({
  actions = [],
  children,
  defaultTitle,
  drawerProps,
  form,
  formProps,
  id,
  initWidth,
  onClose,
  onDelete,
  onReset,
  onSubmit,
  open,
  disableCloseConfirm,
  keepMounted,
  onExited,
}: DetailDrawerProps<T>) => {
  const { t } = useTranslation(['common', 'model']);
  const { setConfirmDialog } = useAppStore();
  const { model } = useViewContext();
  const { model: modelActions } = useUserActions(model);
  const { context, setFullscreen } = useDetailDrawer({ defaultTitle });

  const {
    fullscreen,
    onFullscreenToggle,
    disableEscapeKeyDown,
    disableBackdropClose,
  } = context;

  const closeHandler = (event: object, reason: ModalCloseReason) => {
    if (
      !disableCloseConfirm &&
      form.formState.isDirty &&
      (reason === modalCloseReasonKeys.backdropClick ||
        reason === modalCloseReasonKeys.escapeKeyDown)
    ) {
      setConfirmDialog({
        title: t('message.confirm.closeForm.title'),
        content: t('message.confirm.closeForm.content'),
        context: 'close',
        onConfirm: () => {
          setFullscreen(false);
          onClose?.(event, reason);
        },
      });

      return;
    }

    setFullscreen(false);
    onClose?.(event, reason);
  };

  const deleteConfirmHandler = useCallback(() => {
    setConfirmDialog({
      title: t('message.confirm.delete.title'),
      content: t('message.confirm.delete.content', {
        subject:
          t(`model:plurals.${model}.item`, {
            count: 1,
          }).toLowerCase() + ` #${id}`,
      }),
      context: 'delete',
      onConfirm: () => onDelete?.(Number(id)),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, model, onDelete]);

  const headingActions = [
    {
      children: fullscreen ? <IconWindowMinimize /> : <IconWindowMaximize />,
      onClick: () => onFullscreenToggle(),
      tooltip: fullscreen ? t('button.exitFullscreen') : t('button.fullscreen'),
    },
  ];

  const footerActions: ButtonProps[] = [
    ...actions,
    {
      id: 'cancel',
      children: t('button.cancel'),
      onClick: () => closeHandler({}, 'default'),
      variant: 'outlined',
    },
    {
      id: 'delete',
      children: t('button.delete'),
      onClick: deleteConfirmHandler,
      variant: 'outlined',
      color: 'error',
      disabled: !modelActions.delete,
      hidden: !onDelete || id === 'new',
    },
    {
      id: 'reset',
      children: t('button.reset'),
      onClick: () => onReset?.(),
      variant: 'outlined',
      color: 'warning',
      hidden: !onReset,
    },
    {
      id: 'submit',
      type: 'submit',
      children: id === 'new' ? t('button.create') : t('button.update'),
      variant: 'contained',
      disabled: id === 'new' ? !modelActions.create : !modelActions.modify,
    },
  ];

  return (
    <DetailDrawerContextProvider value={context}>
      <DrawerBase
        anchor="right"
        labelId={`detail-drawer-${id}`}
        open={open && modelActions.view}
        onClose={closeHandler}
        width={
          fullscreen
            ? '100%'
            : {
                xs: '100%',
                md: initWidth ? initWidth : DETAIL_DEFAULT_DRAWER_WIDTH_DEFAULT,
              }
        }
        disableEscapeKeyDown={disableEscapeKeyDown}
        disableBackdropClose={disableBackdropClose}
        {...drawerProps}
        ModalProps={{
          keepMounted,
          ...drawerProps?.ModalProps,
        }}
        slotProps={{
          transition: {
            onExited,
          },
        }}
      >
        <ControlledForm<T>
          form={form}
          onSubmit={onSubmit && form.handleSubmit(onSubmit)}
          {...formProps}
          sx={{ width: '100%', height: '100%', ...formProps?.sx }}
        >
          <DrawerLayout
            title={context.title}
            titleActions={headingActions}
            actions={footerActions?.map((button, index) => {
              if (button.hidden) return null;

              return <Button key={button.id || index} {...button} />;
            })}
            onClose={() => closeHandler({}, 'default')}
            children={children}
          />
        </ControlledForm>
      </DrawerBase>
    </DetailDrawerContextProvider>
  );
};

export default DetailDrawer;
