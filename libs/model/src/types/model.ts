import { modelKeys } from '../enums';
import { ArticlesDetail, ArticlesItem } from './articles';
import { CategoriesDetail, CategoriesItem } from './categories';
import { TagsDetail, TagsItem } from './tags';

export type ModelNames = keyof typeof modelKeys;

export type CommonModelItem = ArticlesItem | CategoriesItem | TagsItem; // TODO

export type CommonModelDetail = ArticlesDetail | CategoriesDetail | TagsDetail; // TODO
