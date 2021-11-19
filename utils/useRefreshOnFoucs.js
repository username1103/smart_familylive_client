import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useRefreshOnFocus = ({ isInitialized, refresh }) => {
  const navigation = useNavigation();

  useEffect(
    () =>
      navigation.addListener('focus', () => {
        if (isInitialized) {
          refresh();
        }
      }),
    [navigation, refresh]
  );
};
