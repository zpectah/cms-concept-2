import { modelTypes, ModelNames } from '@model';
import { getOptionValue } from '../helpers';
import { OptionItem } from '../components';

export const useSelectOptions = () => {
  const getOptionsFromList = (list: (string | number)[]) => {
    const tmpItems: OptionItem[] = [];

    list.forEach((item) => {
      tmpItems.push({
        id: String(item),
        value: item,
        label: String(item),
      });
    });

    return tmpItems;
  };

  const getTranslatedOptionsFromList = (
    list: (string | number)[],
    prefix?: string
  ) => {
    const tmpItems: OptionItem[] = [];

    list.forEach((item) => {
      tmpItems.push({
        id: String(item),
        value: item,
        label: getOptionValue(String(item), prefix),
      });
    });

    return tmpItems;
  };

  const getTypeFieldOptions = (model: ModelNames, disabled?: string[]) => {
    const tmpItems: OptionItem[] = [];

    (modelTypes as Record<string, string[]>)[model].forEach((item) => {
      if (disabled?.includes(item)) return;

      tmpItems.push({
        id: String(item),
        value: item,
        label: getOptionValue(item, 'model'),
      });
    });

    return tmpItems;
  };

  return {
    getOptionsFromList,
    getTranslatedOptionsFromList,
    getTypeFieldOptions,
  };
};
