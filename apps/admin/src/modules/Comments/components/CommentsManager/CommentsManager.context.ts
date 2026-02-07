import { createContext, useContext } from 'react';
import { CommentsDetail } from '@model';
import { CommentsContentType } from './types';

interface ICommentsManagerContext {
  contentType?: CommentsContentType | null;
  contentId?: number;
  parentId: number | null;
  detailOpen: number | 'new' | null;
  setDetailOpen: (detail: number | 'new' | null) => void;
  rowActions: {
    onDetail: (id: number | 'new', parentId?: number) => void;
    onCreate: (master: CommentsDetail) => void;
    onPatch: (master: CommentsDetail) => void;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onDeletePermanent: (id: number) => void;
  };
}

const defaultCommentsManagerContext: ICommentsManagerContext = {
  contentType: null,
  contentId: 0,
  parentId: null,
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

export const CommentsManagerContext = createContext(
  defaultCommentsManagerContext
);

export const CommentsManagerContextProvider = CommentsManagerContext.Provider;
export const CommentsManagerContextConsumer = CommentsManagerContext.Consumer;

export const useCommentsManagerContext = () =>
  useContext<ICommentsManagerContext>(CommentsManagerContext);
