import { Stack, Divider } from '@mui/material';
import { DemoUi } from './DemoUi';
import { DemoUtils } from './DemoUtils';
import { DemoForm } from './DemoForm';

const Demo = () => {
  return (
    <Stack gap={3}>
      <DemoUi />
      <Divider />
      <DemoUtils />
      <Divider />
      <DemoForm />
    </Stack>
  );
};

export default Demo;
