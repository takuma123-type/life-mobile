import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import RootNavigation from './src/navigation';
import './src/i18n';
import { store } from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <RootNavigation />
      </SafeAreaView>
    </Provider>
  );
}
