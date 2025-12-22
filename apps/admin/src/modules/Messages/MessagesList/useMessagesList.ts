export const useMessagesList = () => {
  const toggleHandler = (ids: number[]) => {
    console.log('on toggle', ids);
  };

  const deleteHandler = (ids: number[]) => {
    console.log('on delete', ids);
  };

  const deletePermanentHandler = (ids: number[]) => {
    console.log('on delete permanent', ids);
  };

  const readHandler = (ids: number[]) => {
    console.log('on read', ids);
  };

  return {
    items: [],
    filter: {},
    rowActions: {
      onDetail: true,
      onDelete: (id: number) => deleteHandler([id]),
      onToggle: (id: number) => toggleHandler([id]),
      onDeletePermanent: (id: number) => deletePermanentHandler([id]),
      onRead: (id: number) => readHandler([id]),
    },
    selectedActions: {
      onToggleSelected: toggleHandler,
      onDeleteSelected: deleteHandler,
      onDeletePermanentSelected: deletePermanentHandler,
      onReadSelected: readHandler,
    },
    loading: {
      items: false,
      submitting: false,
    },
  };
};
