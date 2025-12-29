import {
  Stack,
  styled,
  Typography,
  Box,
  Container,
  Alert,
} from '@mui/material';
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
const DrawerContent = styled('div')(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
}));
const DrawerActionsWrapper = styled('footer')(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  flex: 0,
}));
const ActionsMessages = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
}));
const DrawerActions = styled('div')(({ theme }) => ({
  width: '100%',
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
  actionsMessages = [],
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
          <Container disableGutters>
            {text && (
              <Typography id={`${labelId}-description`}>{text}</Typography>
            )}
            {children}
          </Container>
        </DrawerContent>
      </DrawerContentWrapper>
      <DrawerActionsWrapper>
        {actionsMessages?.length > 0 && (
          <Container disableGutters>
            <ActionsMessages>
              {actionsMessages.map((item, index) => (
                <Alert key={index} variant="filled" {...item} />
              ))}
            </ActionsMessages>
          </Container>
        )}
        {actions && <DrawerActions>{actions}</DrawerActions>}
      </DrawerActionsWrapper>
    </DrawerContainer>
  );
};

export default DrawerLayout;
