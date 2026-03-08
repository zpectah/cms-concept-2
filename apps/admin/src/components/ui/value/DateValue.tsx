import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { getFormattedDateString } from '../../../utils';
import { getFormatByLocale } from '../../../helpers';
import { DateValueProps } from './types';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

const DateValue = ({ id, value, typographyProps }: DateValueProps) => {
  const {
    i18n: { language },
  } = useTranslation();

  const { date, time } = getFormatByLocale(language);

  return (
    <Typography
      id={id}
      variant="inherit"
      {...typographyProps}
      sx={{
        whiteSpace: 'pre',
        ...typographyProps?.sx,
      }}
    >
      {getFormattedDateString(value, false, { date, time })}
    </Typography>
  );
};

export default DateValue;
