export const useMembersList = () => {
  const toggleHandler = (ids: number[]) => {
    console.log('on toggle', ids);
  };

  const deleteHandler = (ids: number[]) => {
    console.log('on delete', ids);
  };

  const deletePermanentHandler = (ids: number[]) => {
    console.log('on delete permanent', ids);
  };

  return {
    items: [],
    filter: {},
    rowActions: {
      onDetail: true,
      onDelete: (id: number) => deleteHandler([id]),
      onToggle: (id: number) => toggleHandler([id]),
      onDeletePermanent: (id: number) => deletePermanentHandler([id]),
    },
    selectedActions: {
      onToggleSelected: toggleHandler,
      onDeleteSelected: deleteHandler,
      onDeletePermanentSelected: deletePermanentHandler,
    },
    loading: {
      items: false,
      submitting: false,
    },
  };
};
