import { Grid } from '@mui/material';
import { SPACING } from '../../constants';
import InputField from './InputField';
import { AddressFieldProps } from './types';

const AddressField = ({
  fieldPrefix,
  fieldCommonProps,
  slotProps,
  containerProps,
}: AddressFieldProps) => {
  const prefix = fieldPrefix ? `${fieldPrefix}.` : '';

  return (
    <Grid container spacing={SPACING.form} {...containerProps}>
      <InputField
        name={`${prefix}street`}
        label="Street" // TODO #i18n
        placeholder="Address street" // TODO #i18n
        isFullWidth
        {...fieldCommonProps}
        {...slotProps?.street}
      />
      <InputField
        name={`${prefix}street_no`}
        label="Street no" // TODO #i18n
        placeholder="Address street no" // TODO #i18n
        {...fieldCommonProps}
        {...slotProps?.streetNo}
      />
      <InputField
        name={`${prefix}district`}
        label="District" // TODO #i18n
        placeholder="Address district" // TODO #i18n
        isFullWidth
        {...fieldCommonProps}
        {...slotProps?.district}
      />
      <InputField
        name={`${prefix}city`}
        label="City" // TODO #i18n
        placeholder="Address city" // TODO #i18n
        isFullWidth
        {...fieldCommonProps}
        {...slotProps?.city}
      />
      <InputField
        name={`${prefix}country`}
        label="Country" // TODO #i18n
        placeholder="Address country" // TODO #i18n
        isFullWidth
        {...fieldCommonProps}
        {...slotProps?.country}
      />
      <InputField
        name={`${prefix}zip`}
        label="Zip" // TODO #i18n
        placeholder="Address zip" // TODO #i18n
        {...fieldCommonProps}
        {...slotProps?.zip}
      />
    </Grid>
  );
};

export default AddressField;
