import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAddr } from '../addr';
import { useAuth } from '../auth';

export const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const addr = useAddr();
  const authHook = useAuth();

  const take = () => {
    const get = async ({ userId }) => {
      const result = await authHook.authedAxios({
        method: 'get',
        url: `${addr}/v1/users/${userId}`,
      });

      return result.data.user;
    };
    const update = async ({ userId, name, bloodType, gender, birthday }) => {
      await authHook.authedAxios({
        method: 'put',
        url: `${addr}/v1/users/${userId}`,
        data: {
          name,
          bloodType,
          gender,
          birthday,
        },
      });
    };

    return { get, update };
  };

  const [state, setState] = useState(take());

  useEffect(() => {
    setState(take());
  }, [addr, authHook]);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
