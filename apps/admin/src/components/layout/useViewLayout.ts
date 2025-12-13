import { useState } from 'react';

export const useViewLayout = () => {
  const [listSelected, setListSelected] = useState<number[]>([]);

  return {
    listSelected,
    setListSelected,
  };
};
