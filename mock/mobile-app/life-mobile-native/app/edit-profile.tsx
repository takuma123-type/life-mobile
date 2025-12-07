import React from 'react';
import { SafeAreaView } from 'react-native';
import EditProfileScreen from '../src/screens/EditProfileScreen';

export default function EditProfileRoute() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <EditProfileScreen />
    </SafeAreaView>
  );
}
