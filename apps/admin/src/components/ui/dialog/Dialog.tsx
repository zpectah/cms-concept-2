import {
  Dialog as MuiDialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { CloseButton } from '../button';
import { DialogProps } from './types';

const Dialog = ({
  labelId = 'dialog-base',
  actionsProps,
  titleProps,
  contentProps,
  contentTextProps,
  actions,
  title,
  content,
  text,
  children,
  disableCloseButton,
  disableBackdropClose,
  onClose,
  ...rest
}: DialogProps) => {
  const closeHandler = () => onClose?.({}, 'escapeKeyDown');

  if (!title && rest.open)
    console.warn('Title is need for proper display of component');

  return (
    <MuiDialog
      id={labelId}
      aria-labelledby={`${labelId}-title`}
      aria-describedby={`${labelId}-description`}
      onClose={(event, reason) => {
        if (disableBackdropClose && reason === 'backdropClick') return;

        onClose?.(event, reason);
      }}
      {...rest}
    >
      {!disableCloseButton && (
        <CloseButton
          sx={({ spacing }) => ({
            position: 'absolute',
            top: spacing(1),
            right: spacing(1),
          })}
          onClick={closeHandler}
        />
      )}
      {title && (
        <DialogTitle id={`${labelId}-title`} {...titleProps}>
          {title}
        </DialogTitle>
      )}
      <DialogContent {...contentProps}>
        {text && (
          <DialogContentText
            id={`${labelId}-description`}
            {...contentTextProps}
          >
            {text}
          </DialogContentText>
        )}
        {content}
      </DialogContent>
      {children}
      {actions && <DialogActions {...actionsProps}>{actions}</DialogActions>}
    </MuiDialog>
  );
};

export default Dialog;
