import { useTranslation } from 'react-i18next';
import { Box, Stack, StackSeparator, VStack, HStack } from '@chakra-ui/react';
import { useAppStore } from '../../store';
import { ButtonBase } from '../../components';

const DemoExamples = () => {
  const { t } = useTranslation();
  const { setConfirmDialog, addToast } = useAppStore();

  return (
    <div>
      <Stack gap={'2rem'} separator={<StackSeparator />}>
        <Box>
          <VStack>
            <HStack>
              <ButtonBase
                variant="outline"
                onClick={() =>
                  setConfirmDialog({
                    title: 'Delete something?',
                    content: 'My custom content',
                    onConfirm: () => console.log('on confirm'),
                  })
                }
              >
                {t('button.open')} (confirm dialog)
              </ButtonBase>
            </HStack>
            <HStack>
              <ButtonBase
                onClick={() => {
                  addToast({
                    title: 'Toast info title',
                    description: 'Some description ...',
                    severity: 'info',
                  });
                }}
              >
                Open info toast
              </ButtonBase>

              <ButtonBase
                onClick={() => {
                  addToast({
                    title: 'Toast success title',
                    severity: 'success',
                    autoclose: true,
                  });
                }}
              >
                Open success toast
              </ButtonBase>

              <ButtonBase
                onClick={() => {
                  addToast({
                    title: 'Toast error title',
                    severity: 'error',
                  });
                }}
              >
                Open error toast
              </ButtonBase>
            </HStack>
          </VStack>
        </Box>
        <Box>forms ... todo</Box>
      </Stack>
    </div>
  );
};

export default DemoExamples;
