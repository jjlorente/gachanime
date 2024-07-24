import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  userData: any; 
  userGachas: any;
}

const defaultContextValue: AppContextType = {
  userData: null,
  userGachas: null
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<any>(null);
  const [userGachas, setUserGachas] = useState<any>(null);

  const value = {
    userData,
    userGachas
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
