'use client';

import React, { createContext, ReactNode, useState } from 'react';

export interface MenuContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const menuContext = createContext<MenuContextType | undefined>(
  undefined
);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <menuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </menuContext.Provider>
  );
};
