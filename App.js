import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navs/root.js';
import { AddrProvider } from './hooks/addr/index.js';

export default function App() {
  return (
    <AddrProvider>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </AddrProvider>
  );
}
