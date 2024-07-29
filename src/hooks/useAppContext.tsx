import { useContext } from 'react';
import { AppContext } from '../contexts/appContext';

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useMenu must be used within a AppProvider');
  }
  return context;
};

export default useAppContext;
