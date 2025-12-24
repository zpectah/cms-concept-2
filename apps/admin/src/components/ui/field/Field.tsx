import { Box, Stack, Grid, FormHelperText, Typography } from '@mui/material';
import { Label } from '../label';
import { fieldLayoutKeys } from './enums';
import { FieldProps } from './types';
import {
  fieldGridInputSizeDefault,
  fieldGridLabelSizeDefault,
} from './constants';

const Field = ({
  children,
  label,
  labelCaption,
  id,
  isRequired,
  helpers = [],
  errors = [],
  layout = fieldLayoutKeys.responsive,
  spacing = 1,
  size = 12,
  gridProps,
  labelProps,
  inputBoxProps,
}: FieldProps) => {
  const sizes = {
    responsive: {
      label: {
        xs: 12,
        md: fieldGridLabelSizeDefault,
      },
      input: {
        xs: 12,
        md: fieldGridInputSizeDefault,
      },
    },
    horizontal: {
      label: fieldGridLabelSizeDefault,
      input: fieldGridInputSizeDefault,
    },
    vertical: {
      label: 12,
      input: 12,
    },
  };

  const offset = {
    responsive: {
      xs: 0,
      md: fieldGridLabelSizeDefault,
    },
    horizontal: fieldGridLabelSizeDefault,
    vertical: 0,
  };

  const isMessages = helpers?.length > 0 || errors?.length > 0;

  return (
    <Grid container spacing={spacing} size={size} {...gridProps}>
      <Grid size={sizes[layout].label}>
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
          flexWrap="wrap"
          sx={{ height: '100%' }}
        >
          <Label required={isRequired} htmlFor={id} {...labelProps}>
            {label}
          </Label>
          {labelCaption && (
            <Typography variant="caption" color="textDisabled">
              {labelCaption}
            </Typography>
          )}
        </Stack>
      </Grid>
      <Grid size={sizes[layout].input}>
        <Stack direction="column" spacing={spacing}>
          <Box {...inputBoxProps}>{children}</Box>
        </Stack>
      </Grid>
      {isMessages && (
        <Grid size={sizes[layout].input} offset={offset[layout]}>
          <Stack direction="column" spacing={spacing}>
            {helpers?.map((text, index) => (
              <FormHelperText key={`h_${index}`}>{text}</FormHelperText>
            ))}
            {errors?.map((text, index) => (
              <FormHelperText key={`h_${index}`} error>
                {text}
              </FormHelperText>
            ))}
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};

export default Field;
