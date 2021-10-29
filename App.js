import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navs/root.js';
import { AddrProvider } from './hooks/addr/index.js';
import { AuthProvider } from './hooks/auth/index.js';

export default function App() {
  return (
    <AddrProvider>
      <AuthProvider>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </AuthProvider>
    </AddrProvider>
  );
}
