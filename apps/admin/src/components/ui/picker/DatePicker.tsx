import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { getFormatByLocale } from '../../../helpers';
import { DatePickerProps } from './types';

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (props, ref) => {
    const { id, isError, isRequired, isDisabled, isReadOnly, ...rest } = props;

    const {
      i18n: { language },
    } = useTranslation();

    const { date } = getFormatByLocale(language);

    return (
      <MuiDatePicker
        format={date}
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

export default DatePicker;
