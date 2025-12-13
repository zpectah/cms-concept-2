import { createContext, useContext } from 'react';
import { IDetailDrawerContext } from './types';

const defaultContext: IDetailDrawerContext = {
  fullscreen: false,
  onFullscreenToggle: () => null,
  title: '',
  setTitle: () => null,
  disableEscapeKeyDown: false,
  setDisableEscapeKeyDown: () => null,
  disableBackdropClose: false,
  setDisableBackdropClose: () => null,
};

export const DetailDrawerContext = createContext(defaultContext);

export const DetailDrawerContextProvider = DetailDrawerContext.Provider;
export const DetailDrawerContextConsumer = DetailDrawerContext.Consumer;

export const useDetailDrawerContext = () =>
  useContext<IDetailDrawerContext>(DetailDrawerContext);
