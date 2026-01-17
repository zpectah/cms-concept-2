import { createContext, useContext } from 'react';
import { BlacklistDetail } from '@model';

interface ISettingsBlacklistContext {
  detail: number | 'new' | null;
  setDetail: (detail: number | 'new' | null) => void;
  rowActions: {
    onCreate: (master: BlacklistDetail) => void;
    onPatch: (master: BlacklistDetail) => void;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onDeletePermanent: (id: number) => void;
  };
  selectedActions: {
    onToggleSelected: (ids: number[]) => void;
    onDeleteSelected: (ids: number[]) => void;
    onDeletePermanentSelected: (ids: number[]) => void;
  };
  selected: number[];
  onSelectRow: (id: number) => void;
  onSelectAll: () => void;
}

const defaultSettingsBlacklistContext: ISettingsBlacklistContext = {
  detail: null,
  setDetail: () => null,
  rowActions: {
    onCreate: () => null,
    onPatch: () => null,
    onToggle: (id: number) => null,
    onDelete: (id: number) => null,
    onDeletePermanent: (id: number) => null,
  },
  selectedActions: {
    onToggleSelected: () => null,
    onDeleteSelected: () => null,
    onDeletePermanentSelected: () => null,
  },
  selected: [],
  onSelectRow: () => null,
  onSelectAll: () => null,
};

export const SettingsBlacklistContext = createContext(
  defaultSettingsBlacklistContext
);

export const SettingsBlacklistContextProvider =
  SettingsBlacklistContext.Provider;
export const SettingsBlacklistContextConsumer =
  SettingsBlacklistContext.Consumer;

export const useSettingsBlacklistContext = () =>
  useContext<ISettingsBlacklistContext>(SettingsBlacklistContext);
