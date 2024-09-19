'use client';

import { menuContext } from '@/app/_contexts/menuContext';
import { useContext } from 'react';

const useMenuContext = () => {
  const context = useContext(menuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

export default useMenuContext;
