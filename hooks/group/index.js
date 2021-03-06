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

    const getQuestions = async ({ groupId }) => {
      const result = await authHook.authedAxios({
        method: 'get',
        url: `${addr}/v1/groups/${groupId}/questions`,
      });

      return result.data;
    };

    const getQuestion = async ({ questionId }) => {
      const result = await authHook.authedAxios({
        method: 'get',
        url: `${addr}/v1/questions/${questionId}`,
      });

      return result.data;
    };

    const getCustomQuestion = async ({ customQuestionid }) => {
      const result = await authHook.authedAxios({
        method: 'get',
        url: `${addr}/v1/custom-questions/${customQuestionid}`,
      });

      return result.data;
    };

    const getGroupQuestion = async ({ groupQuestionId }) => {
      const result = await authHook.authedAxios({
        method: 'get',
        url: `${addr}/v1/group-questions/${groupQuestionId}`,
      });

      return result.data;
    };

    const replyQuestion = async ({ groupQuestionId, userId, answer }) => {
      await authHook.authedAxios({
        method: 'put',
        url: `${addr}/v1/group-questions/${groupQuestionId}/answer`,
        data: {
          userId,
          answer,
        },
      });
    };

    const buyItem = async ({ groupId, itemId, userId }) => {
      await authHook.authedAxios({
        method: 'post',
        url: `${addr}/v1/groups/${groupId}/items`,
        data: {
          itemId,
          userId,
        },
      });
    };

    const getItems = async ({ groupId }) => {
      const result = await authHook.authedAxios({
        method: 'get',
        url: `${addr}/v1/groups/${groupId}/items`,
      });

      return result.data;
    };

    const createCustomQuestion = async ({
      groupId,
      contents,
      authorId,
      groupItemId,
    }) => {
      await authHook.authedAxios({
        method: 'post',
        url: `${addr}/v1/groups/${groupId}/custom-question`,
        data: {
          contents,
          authorId,
          groupItemId,
        },
      });
    };

    const updateGroupQuestionTime = async ({ groupId, time, groupItemId }) => {
      await authHook.authedAxios({
        method: 'put',
        url: `${addr}/v1/groups/${groupId}/time`,
        data: {
          time,
          groupItemId,
        },
      });
    };

    return {
      generateCode,
      get,
      getMembers,
      getQuestions,
      getQuestion,
      getCustomQuestion,
      getGroupQuestion,
      replyQuestion,
      buyItem,
      getItems,
      createCustomQuestion,
      updateGroupQuestionTime,
    };
  };

  const [state, setState] = useState(take());

  useEffect(() => {
    setState(take());
  }, [addr, authHook]);

  return (
    <GroupContext.Provider value={state}>{children}</GroupContext.Provider>
  );
};
