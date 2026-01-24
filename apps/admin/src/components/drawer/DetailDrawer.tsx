import { useCallback, useMemo } from 'react';
import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AlertProps, Grid, Box } from '@mui/material';
import { IconMaximize, IconMaximizeOff } from '@tabler/icons-react';
import { useAppStore } from '../../store';
import { useViewContext } from '../../contexts';
import { modalCloseReasonKeys } from '../../enums';
import { ModalCloseReason } from '../../types';
import { useUserActions } from '../../hooks';
import { DETAIL_DEFAULT_DRAWER_WIDTH_DEFAULT, SPACING } from '../../constants';
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
  externalSlot,
  formId,
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
      children: fullscreen ? <IconMaximizeOff /> : <IconMaximize />,
      onClick: () => onFullscreenToggle(),
      tooltip: fullscreen ? t('button.exitFullscreen') : t('button.fullscreen'),
    },
  ];

  const footerActions: ButtonProps[] = [
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
    ...actions,
    {
      id: 'submit',
      type: 'submit',
      form: formId,
      children: id === 'new' ? t('button.create') : t('button.update'),
      variant: 'contained',
      disabled: id === 'new' ? !modelActions.create : !modelActions.modify,
      hidden: !onSubmit,
    },
  ];

  const formErrors = useMemo((): AlertProps[] => {
    let counter = 0;

    if (form.formState.errors) {
      Object.keys(form.formState.errors).forEach((key) => {
        counter++;
      });
    }

    return counter > 0
      ? [
          {
            children: `There is ${counter} error(s)`,
            severity: 'error',
          },
        ]
      : [];
  }, [form.formState.errors]);

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
        <DrawerLayout
          title={context.title}
          titleActions={headingActions}
          actions={footerActions?.map((button, index) => {
            if (button.hidden) return null;

            return <Button key={button.id || index} {...button} />;
          })}
          actionsMessages={formErrors}
          onClose={() => closeHandler({}, 'default')}
        >
          <Box sx={{ width: '100%', height: '100%' }}>
            <ControlledForm<T>
              id={formId}
              form={form}
              onSubmit={onSubmit && form.handleSubmit(onSubmit)}
              {...formProps}
            >
              {children}
            </ControlledForm>
            {externalSlot && (
              <Grid
                container
                sx={{ mt: 2, width: '100%' }}
                spacing={SPACING.form}
              >
                {externalSlot}
              </Grid>
            )}
          </Box>
        </DrawerLayout>
      </DrawerBase>
    </DetailDrawerContextProvider>
  );
};

export default DetailDrawer;
