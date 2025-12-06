import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const ChatListScreen: React.FC = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Header title={t('screen.chat.title')} />
      <View style={styles.content}>
        <Text>Chat list</Text>
      </View>
      <BottomNav active="chat" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { flex: 1, padding: 16 },
});

export default ChatListScreen;
