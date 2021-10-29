import React, { createContext, useContext, useEffect, useState } from 'react';
import config from '../../config';

export const AddrContext = createContext(null);

export const useAddr = () => useContext(AddrContext);

export const AddrProvider = ({ children }) => {
  const take = () => {
    return config.apiAddr;
  };

  const [state, setState] = useState(take());
  useEffect(() => {
    setState(take());
  }, []);

  return <AddrContext.Provider value={state}>{children}</AddrContext.Provider>;
};
