import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation(['form']);

  const prefix = fieldPrefix ? `${fieldPrefix}.` : '';

  return (
    <Grid container spacing={SPACING.form} {...containerProps}>
      <InputField
        name={`${prefix}street`}
        label={t('form:label.street')}
        placeholder={t('form:placeholder.street')}
        isFullWidth
        {...fieldCommonProps}
        {...slotProps?.street}
      />
      <InputField
        name={`${prefix}street_no`}
        label={t('form:label.street_no')}
        placeholder={t('form:placeholder.street_no')}
        {...fieldCommonProps}
        {...slotProps?.streetNo}
      />
      <InputField
        name={`${prefix}district`}
        label={t('form:label.district')}
        placeholder={t('form:placeholder.district')}
        isFullWidth
        {...fieldCommonProps}
        {...slotProps?.district}
      />
      <InputField
        name={`${prefix}city`}
        label={t('form:label.city')}
        placeholder={t('form:placeholder.city')}
        isFullWidth
        {...fieldCommonProps}
        {...slotProps?.city}
      />
      <InputField
        name={`${prefix}country`}
        label={t('form:label.country')}
        placeholder={t('form:placeholder.country')}
        isFullWidth
        {...fieldCommonProps}
        {...slotProps?.country}
      />
      <InputField
        name={`${prefix}zip`}
        label={t('form:label.zip')}
        placeholder={t('form:placeholder.zip')}
        {...fieldCommonProps}
        {...slotProps?.zip}
      />
    </Grid>
  );
};

export default AddressField;
