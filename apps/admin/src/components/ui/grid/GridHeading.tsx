import { Divider, Grid, Typography } from '@mui/material';
import { GridHeadingProps } from './types';

const GridHeading = ({
  title,
  variant = 'h3',
  disableSeparator,
  gridProps,
}: GridHeadingProps) => (
  <Grid size={12} {...gridProps}>
    <Typography variant={variant}>{title}</Typography>
    {!disableSeparator && <Divider sx={{ my: 2 }} />}
  </Grid>
);

export default GridHeading;
