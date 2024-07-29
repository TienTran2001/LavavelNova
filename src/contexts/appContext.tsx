import React, { createContext, useState, ReactNode } from 'react';

export interface AppContextType {
  countMaterialCategories: number;
  setCountMaterialCategories: React.Dispatch<React.SetStateAction<number>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [countMaterialCategories, setCountMaterialCategories] =
    useState<number>(0);

  return (
    <AppContext.Provider
      value={{ countMaterialCategories, setCountMaterialCategories }}
    >
      {children}
    </AppContext.Provider>
  );
};
