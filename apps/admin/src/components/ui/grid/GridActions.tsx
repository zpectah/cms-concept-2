import { Divider, Grid, Stack } from '@mui/material';
import { SPACING } from '../../../constants';
import { GridActionsProps } from './types';

const GridActions = ({ children, disableSeparator }: GridActionsProps) => (
  <Grid size={12}>
    {!disableSeparator && <Divider />}
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      gap={SPACING.actions}
      sx={{ pt: 3 }}
    >
      {children}
    </Stack>
  </Grid>
);

export default GridActions;
