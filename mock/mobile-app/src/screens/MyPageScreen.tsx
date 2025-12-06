import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const MyPageScreen: React.FC = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Header title={t('screen.mypage.title')} />
      <View style={styles.content}>
        <Text>{t('screen.mypage.password.change')}</Text>
      </View>
      <BottomNav active="mypage" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { flex: 1, padding: 16 },
});

export default MyPageScreen;
