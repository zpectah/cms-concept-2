import { ListModelItem } from '@model';

export const useModelValidations = () => {
  const isAttributeUnique = <T extends ListModelItem>(
    items: T[],
    key: keyof T,
    object: T
  ) => {
    return !items?.some(
      (item) =>
        item.id !== object.id && String(item[key]) === String(object[key])
    );
  };

  return {
    isAttributeUnique,
  };
};
