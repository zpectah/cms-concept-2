import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { getFormatByLocale } from '../../../helpers';
import { DateTimePickerProps } from './types';

const DateTimePicker = forwardRef<HTMLInputElement, DateTimePickerProps>(
  (props, ref) => {
    const { id, isError, isRequired, isDisabled, isReadOnly, ...rest } = props;

    const {
      i18n: { language },
    } = useTranslation();

    const { date, time } = getFormatByLocale(language);

    return (
      <MuiDateTimePicker
        format={`${date} ${time}`}
        ampm={false}
        inputRef={ref}
        {...rest}
        enableAccessibleFieldDOMStructure={false}
        slotProps={{
          textField: {
            id,
            error: isError,
            required: isRequired,
            disabled: isDisabled,
            readOnly: isReadOnly,
            ...rest?.slotProps?.textField,
          },
          ...rest?.slotProps,
        }}
      />
    );
  }
);

export default DateTimePicker;
