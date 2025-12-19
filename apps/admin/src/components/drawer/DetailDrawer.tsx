import { FieldValues } from 'react-hook-form';
import { IconWindowMaximize, IconWindowMinimize } from '@tabler/icons-react';
import { ControlledForm } from '../form';
import { Button, DrawerBase, DrawerLayout, ButtonProps } from '../ui';
import { DetailDrawerProps } from './types';
import { DetailDrawerContextProvider } from './DetailDrawer.context';
import { useDetailDrawer } from './useDetailDrawer';

const DetailDrawer = <T extends FieldValues>({
  children,
  open,
  onClose,
  initWidth,
  defaultTitle,
  form,
  onSubmit,
  actions = [],
  drawerProps,
}: DetailDrawerProps<T>) => {
  const { context, setFullscreen } = useDetailDrawer({ defaultTitle });

  const closeHandler = () => {
    onClose();
    setFullscreen(false);
  };

  const drawerHeadingActions = [
    {
      children: context.fullscreen ? (
        <IconWindowMinimize />
      ) : (
        <IconWindowMaximize />
      ),
      onClick: () => context.onFullscreenToggle(),
      tooltip: context.fullscreen ? 'Exit fullscreen' : 'Open fullscreen',
    },
  ];

  const drawerFooterActions: ButtonProps[] = [
    ...actions,
    {
      children: 'Cancel',
      onClick: closeHandler,
      variant: 'outlined',
    },
    {
      type: 'submit',
      children: 'Submit',
      variant: 'contained',
    },
  ];

  return (
    <DetailDrawerContextProvider value={context}>
      <DrawerBase
        anchor="right"
        labelId="detail-drawer"
        open={open}
        onClose={closeHandler}
        width={
          context.fullscreen
            ? '100%'
            : {
                xs: '100%',
                md: initWidth ? initWidth : '720px',
              }
        }
        disableEscapeKeyDown={context.disableEscapeKeyDown}
        disableBackdropClose={context.disableBackdropClose}
        {...drawerProps}
      >
        <ControlledForm<T>
          form={form}
          onSubmit={form.handleSubmit(onSubmit)}
          sx={{ width: '100%', height: '100%' }}
        >
          <DrawerLayout
            title={context.title}
            titleActions={drawerHeadingActions}
            actions={drawerFooterActions?.map((button, index) => (
              <Button key={index} {...button} />
            ))}
            onClose={closeHandler}
            children={children}
          />
        </ControlledForm>
      </DrawerBase>
    </DetailDrawerContextProvider>
  );
};

export default DetailDrawer;
