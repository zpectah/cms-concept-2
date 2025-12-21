import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IconWindowMaximize, IconWindowMinimize } from '@tabler/icons-react';
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
  dynamicSlotId,
  form,
  formProps,
  id,
  initWidth,
  onClose,
  onReset,
  onSubmit,
  open,
}: DetailDrawerProps<T>) => {
  const { t } = useTranslation();
  const { context, setFullscreen } = useDetailDrawer({ defaultTitle });

  const {
    fullscreen,
    onFullscreenToggle,
    disableEscapeKeyDown,
    disableBackdropClose,
  } = context;

  const closeHandler = () => {
    setFullscreen(false);
    onClose();
  };

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
      onClick: closeHandler,
      variant: 'outlined',
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
    },
  ];

  return (
    <>
      <DetailDrawerContextProvider value={context}>
        <DrawerBase
          anchor="right"
          labelId={`detail-drawer-${id}`}
          open={open}
          onClose={closeHandler}
          width={
            fullscreen
              ? '100%'
              : {
                  xs: '100%',
                  md: initWidth
                    ? initWidth
                    : DETAIL_DEFAULT_DRAWER_WIDTH_DEFAULT,
                }
          }
          disableEscapeKeyDown={disableEscapeKeyDown}
          disableBackdropClose={disableBackdropClose}
          {...drawerProps}
          ModalProps={{
            keepMounted: true,
            ...drawerProps?.ModalProps,
          }}
        >
          <ControlledForm<T>
            form={form}
            onSubmit={form.handleSubmit(onSubmit)}
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
              onClose={closeHandler}
            >
              {children}
              {dynamicSlotId && <div id={dynamicSlotId} />}
            </DrawerLayout>
          </ControlledForm>
        </DrawerBase>
      </DetailDrawerContextProvider>
    </>
  );
};

export default DetailDrawer;
