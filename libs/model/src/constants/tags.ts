import { tagsColorKeys, tagsTypeKeys } from '../enums';

export const tagsColorTone = {
  red: '#D12B11',
  orange: '#D16E11',
  yellow: '#D1A711',
  green: '#4BD111',
  blue: '#111DD1',
  pink: '#D11181',
  purple: '#B111D1',
  brown: '#4D413F',
  black: '#212121',
  white: '#F0F0F0',
  none: undefined,
};

export const tagsTypeKeysArray = [...Object.keys(tagsTypeKeys)] as [
  string,
  ...string[]
];

export const tagsTypeDefault = tagsTypeKeys.default;

export const tagsColorKeysArray = [...Object.keys(tagsColorKeys)] as [
  string,
  ...string[]
];

export const tagsColorDefault = tagsColorKeys.none;
