import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAddr } from '../addr';
import { useAuth } from '../auth';

export const GroupContext = createContext(null);

export const useGroup = () => useContext(GroupContext);

export const GroupProvider = ({ children }) => {
  const addr = useAddr();
  const authHook = useAuth();

  const take = () => {
    const generateCode = async ({ userId }) => {
      const result = await authHook.authedAxios({
        method: 'post',
        url: `${addr}/v1/groups`,
        data: {
          user: userId,
        },
      });

      return result.data;
    };

    const get = async ({ groupId }) => {
      const result = await authHook.authedAxios({
        method: 'get',
        url: `${addr}/v1/groups/${groupId}`,
      });

      return result.data;
    };

    const getMembers = async ({ groupId }) => {
      const result = await authHook.authedAxios({
        method: 'get',
        url: `${addr}/v1/groups/${groupId}/members`,
      });

      return result.data;
    };

    return { generateCode, get, getMembers };
  };

  const [state, setState] = useState(take());

  useEffect(() => {
    setState(take());
  }, [addr, authHook]);

  return (
    <GroupContext.Provider value={state}>{children}</GroupContext.Provider>
  );
};
