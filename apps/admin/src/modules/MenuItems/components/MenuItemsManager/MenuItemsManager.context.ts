import { createContext, useContext } from 'react';
import { MenuItemsDetail } from '@model';

interface IMenuItemsManagerContext {
  menuId: number | undefined;
  menuPrefix: string;
  detailOpen: number | 'new' | null;
  setDetailOpen: (detail: number | 'new' | null) => void;
  rowActions: {
    onDetail: (id: number | 'new') => void;
    onCreate: (master: MenuItemsDetail) => void;
    onPatch: (master: MenuItemsDetail) => void;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onDeletePermanent: (id: number) => void;
  };
}

const defaultMenuItemsManagerContext: IMenuItemsManagerContext = {
  menuId: 0,
  menuPrefix: '',
  detailOpen: null,
  setDetailOpen: () => null,
  rowActions: {
    onDetail: () => null,
    onCreate: () => null,
    onPatch: () => null,
    onToggle: () => null,
    onDelete: () => null,
    onDeletePermanent: () => null,
  },
};

export const MenuItemsManagerContext = createContext(
  defaultMenuItemsManagerContext
);

export const MenuItemsManagerContextProvider = MenuItemsManagerContext.Provider;
export const MenuItemsManagerContextConsumer = MenuItemsManagerContext.Consumer;

export const useMenuItemsManagerContext = () =>
  useContext<IMenuItemsManagerContext>(MenuItemsManagerContext);
