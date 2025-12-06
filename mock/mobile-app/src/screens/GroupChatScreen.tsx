import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

const GroupChatScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header title="Group Chat" />
      <View style={styles.content}>
        <Text>Group chat</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { flex: 1, padding: 16 },
});

export default GroupChatScreen;
