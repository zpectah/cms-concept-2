import { styled, Tooltip } from '@mui/material';
import { IconTagFilled, IconCircleX } from '@tabler/icons-react';
import { tagsColorKeys, tagsColorTone, TagsColor } from '@model';
import { getOptionValue } from '../../../helpers';
import { ColorValueProps } from './types';

const TagIcon = styled(IconTagFilled, {
  shouldForwardProp: (propName) => propName !== 'colorValue',
})<{ readonly colorValue: TagsColor }>(({ theme, colorValue }) => {
  switch (colorValue) {
    case tagsColorKeys.red:
      return {
        color: tagsColorTone.red,
      };

    case tagsColorKeys.orange:
      return {
        color: tagsColorTone.orange,
      };

    case tagsColorKeys.yellow:
      return {
        color: tagsColorTone.yellow,
      };

    case tagsColorKeys.green:
      return {
        color: tagsColorTone.green,
      };

    case tagsColorKeys.blue:
      return {
        color: tagsColorTone.blue,
      };

    case tagsColorKeys.pink:
      return {
        color: tagsColorTone.pink,
      };

    case tagsColorKeys.purple:
      return {
        color: tagsColorTone.purple,
      };

    case tagsColorKeys.brown:
      return {
        color: tagsColorTone.brown,
      };

    case tagsColorKeys.black:
      return {
        color: tagsColorTone.black,
      };

    case tagsColorKeys.white:
      return {
        color: tagsColorTone.white,
      };

    case tagsColorKeys.none:
    default:
      return {};
  }
});

const NoneIcon = styled(IconCircleX)(() => ({}));

const ColorValue = ({ id, value }: ColorValueProps) => {
  return (
    <Tooltip id={id} title={getOptionValue(value, 'color')}>
      {value === 'none' ? (
        <NoneIcon
          fontSize="small"
          sx={({ palette }) => ({ color: palette.grey['500'] })}
        />
      ) : (
        <TagIcon colorValue={value} fontSize="small" />
      )}
    </Tooltip>
  );
};

export default ColorValue;
