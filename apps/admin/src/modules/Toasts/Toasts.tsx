import { styled, Alert } from '@mui/material';
import { useAppStore } from '../../store';
import { ToastsItem as CommonToastsItem } from '../../types';
import { TOASTS_WIDTH_DEFAULT } from '../../constants';

interface ToastsItemProps extends CommonToastsItem {
  onClose: (id: string) => void;
}

const ToastsWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  height: 0,
  overflow: 'visible',
  position: 'fixed',
  bottom: 0,
  left: 0,
  zIndex: theme.zIndex.snackbar,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'center',
}));

const ToastsWrapperList = styled('div')(({ theme }) => ({
  width: TOASTS_WIDTH_DEFAULT,
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),

  '& > :last-of-type': {
    marginBottom: theme.spacing(1),
  },
}));

const ToastsItem = ({
  id,
  severity,
  title,
  // description, // TODO
  onClose,
}: ToastsItemProps) => (
  <Alert
    id={id}
    variant="filled"
    severity={severity}
    onClose={() => onClose(id)}
  >
    {title}
  </Alert>
);

const Toasts = () => {
  const { toasts, removeToast } = useAppStore();

  return (
    <ToastsWrapper>
      <ToastsWrapperList>
        {toasts.map((toast) => (
          <ToastsItem key={toast.id} onClose={removeToast} {...toast} />
        ))}
      </ToastsWrapperList>
    </ToastsWrapper>
  );
};

export default Toasts;
