import { StackProps, ChipProps, TypographyProps } from '@mui/material';
import { TagsColor } from '@model';

interface ValueBase {
  id?: string;
}

export interface ArrayValueProps extends ValueBase {
  value: (string | number)[];
  stackProps?: Partial<StackProps>;
  chipProps?: Partial<ChipProps>;
}

export interface BooleanValueProps extends ValueBase {
  value?: boolean;
  fontSize?: string;
}

export interface TypeValueProps extends ValueBase {
  value: string;
  prefix?: string;
  chipProps?: Partial<ChipProps>;
}

export interface DateValueProps extends ValueBase {
  value?: string;
  typographyProps?: Partial<TypographyProps>;
}

export interface ColorValueProps extends ValueBase {
  value: TagsColor;
}
