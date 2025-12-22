import {
  contentModelKeys,
  systemModelKeys,
  modelKeys,
  redactionModelKeys,
  organizationModelKeys,
  feedbackModelKeys,
  entitiesModelKeys,
} from '../enums';

export const redactionModelKeysArray = [...Object.keys(redactionModelKeys)] as [
  string,
  ...string[]
];

export const organizationModelKeysArray = [
  ...Object.keys(organizationModelKeys),
] as [string, ...string[]];

export const contentModelKeysArray = [...Object.keys(contentModelKeys)] as [
  string,
  ...string[]
];

export const entitiesModelKeysArray = [...Object.keys(entitiesModelKeys)] as [
  string,
  ...string[]
];

export const feedbackModelKeysArray = [...Object.keys(feedbackModelKeys)] as [
  string,
  ...string[]
];

export const systemModelKeysArray = [...Object.keys(systemModelKeys)] as [
  string,
  ...string[]
];

export const modelKeysArray = [...Object.keys(modelKeys)] as [
  string,
  ...string[]
];
