import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import { Typography } from '@mui/material';
import { getFormattedDateString } from '../../../utils';
import { DateValueProps } from './types';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

const DateValue = ({ id, value, typographyProps }: DateValueProps) => {
  return (
    <Typography id={id} variant="inherit" {...typographyProps}>
      {getFormattedDateString(value)}
    </Typography>
  );
};

export default DateValue;
