import { Stack, styled, Typography, Box } from '@mui/material';
import { CloseButton, IconButtonPlus } from '../button';
import { DrawerLayoutProps } from './types';

const DrawerContainer = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
}));
const DrawerHeading = styled('header')(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flex: 0,
}));
const DrawerContentWrapper = styled('article')(() => ({
  flex: 1,
  overflowY: 'auto',
  overscrollBehavior: 'contain',
}));
const DrawerContent = styled('article')(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
}));
const DrawerActions = styled('footer')(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
  flex: 0,
}));

const DrawerLayout = ({
  labelId,
  title,
  titleActions,
  titleSlot,
  text,
  actions,
  children,
  disableCloseButton,
  onClose,
  wrapperProps,
}: DrawerLayoutProps) => {
  return (
    <DrawerContainer {...wrapperProps}>
      <DrawerHeading id={`${labelId}-title`}>
        {title && (
          <Typography variant="h6" component="h3">
            {title}
          </Typography>
        )}
        <Stack direction="row" gap={1} alignItems="center" justifyContent="end">
          {titleActions?.map((button, index) => (
            <IconButtonPlus key={index} {...button} />
          ))}
          {titleSlot}
          {!disableCloseButton && <CloseButton onClick={onClose} />}
        </Stack>
      </DrawerHeading>
      <DrawerContentWrapper>
        <DrawerContent>
          {text && (
            <Typography id={`${labelId}-description`}>{text}</Typography>
          )}
          {children}
        </DrawerContent>
      </DrawerContentWrapper>
      {actions && <DrawerActions>{actions}</DrawerActions>}
    </DrawerContainer>
  );
};

export default DrawerLayout;
