import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

const ChatDetailScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header title="Chat Detail" />
      <View style={styles.content}>
        <Text>Chat detail</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { flex: 1, padding: 16 },
});

export default ChatDetailScreen;
