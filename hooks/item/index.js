import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAddr } from '../addr';
import { useAuth } from '../auth';

export const ItemContext = createContext(null);

export const useItem = () => useContext(ItemContext);

export const ItmeProvider = ({ children }) => {
  const addr = useAddr();
  const authHook = useAuth();

  const take = () => {
    const gets = async () => {
      const result = await authHook.authedAxios({
        method: 'get',
        url: `${addr}/v1/items`,
      });

      return result.data;
    };

    return {
      gets,
    };
  };

  const [state, setState] = useState(take());

  useEffect(() => {
    setState(take());
  }, [addr, authHook]);

  return <ItemContext.Provider value={state}>{children}</ItemContext.Provider>;
};
