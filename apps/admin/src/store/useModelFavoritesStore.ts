import { create } from 'zustand';
import { ContentModelNames } from '@model';
import { MODEL_FAVORITES_KEY } from '../constants';

type FavoriteValue = number[];
type FavoriteModel = Record<ContentModelNames, FavoriteValue>;

interface ModelFavoritesStore {
  model: FavoriteModel;
  setFavorite: (model: ContentModelNames, value: FavoriteValue) => void;
  clearFavoriteModel: (model: ContentModelNames) => void;
}

const modelDefaults: FavoriteModel = {
  articles: [],
  categories: [],
  customFields: [],
  files: [],
  menu: [],
  menuItems: [],
  pages: [],
  tags: [],
  translations: [],
};

const useModelFavoritesStore = create<ModelFavoritesStore>((set, getState) => {
  const storageString = window.localStorage.getItem(MODEL_FAVORITES_KEY);
  const storageJson = storageString
    ? JSON.parse(storageString)
    : Object.assign(modelDefaults);

  const model: FavoriteModel = {
    ...storageJson,
  };

  const saveToStorage = (object: FavoriteModel) =>
    window.localStorage.setItem(MODEL_FAVORITES_KEY, JSON.stringify(object));

  const setFavoriteHandler = (
    model: ContentModelNames,
    value: FavoriteValue
  ) => {
    const tmpModel: FavoriteModel = { ...getState().model };

    tmpModel[model] = value;

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  return {
    model,
    setFavorite: setFavoriteHandler,
    clearFavoriteModel: (model: ContentModelNames) =>
      setFavoriteHandler(model, []),
  };
});

export default useModelFavoritesStore;
