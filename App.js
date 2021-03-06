import React from 'react';
import moment from 'moment';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navs/root.js';
import { AddrProvider } from './hooks/addr/index.js';
import { AuthProvider } from './hooks/auth/index.js';
import { UserProvider } from './hooks/user/index.js';
import { DeviceWrapper } from './hooks/device/index.js';
import { GroupProvider } from './hooks/group/index.js';
import { ImageProvider } from './hooks/image/index.js';
import { ItmeProvider } from './hooks/item/index.js';

moment.locale('ko');

export default function App() {
  return (
    <AddrProvider>
      <AuthProvider>
        <DeviceWrapper>
          <ImageProvider>
            <ItmeProvider>
              <UserProvider>
                <GroupProvider>
                  <NavigationContainer>
                    <Root />
                  </NavigationContainer>
                </GroupProvider>
              </UserProvider>
            </ItmeProvider>
          </ImageProvider>
        </DeviceWrapper>
      </AuthProvider>
    </AddrProvider>
  );
}
