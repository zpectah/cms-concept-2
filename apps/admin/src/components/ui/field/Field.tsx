import { useMemo } from 'react';
import { Box, Stack, Grid, FormHelperText } from '@mui/material';
import { useMediaQuery } from '../../../hooks';
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
  id,
  isRequired,
  helpers = [],
  errors = [],
  layout = fieldLayoutKeys.responsive,
  spacing = 1,
  gridProps,
  labelProps,
  inputBoxProps,
}: FieldProps) => {
  const { up } = useMediaQuery();

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

  const isMessages = helpers?.length > 0 || errors?.length > 0;

  const isLabelHorizontal = useMemo(() => {
    let horizontal = false;
    if (layout === fieldLayoutKeys.horizontal) horizontal = true;
    if (layout === fieldLayoutKeys.responsive && up.md) horizontal = true;

    return horizontal;
  }, [layout, up]);

  return (
    <Grid container spacing={spacing} {...gridProps}>
      <Grid size={sizes[layout].label}>
        <Box sx={{ pt: isLabelHorizontal ? 2 : 0 }}>
          <Label required={isRequired} htmlFor={id} {...labelProps}>
            {label}
          </Label>
        </Box>
      </Grid>
      <Grid size={sizes[layout].input}>
        <Stack direction="column" spacing={spacing}>
          <Box {...inputBoxProps}>{children}</Box>
          {isMessages && (
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
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Field;
