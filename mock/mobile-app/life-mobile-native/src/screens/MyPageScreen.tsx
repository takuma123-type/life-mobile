import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { designTokens } from '@styles/designTokens.native';

const MyPageScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.root}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>マイページ</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.content}>
          {/* パスワード変更カード */}
          <View style={styles.passwordCard}>
            <Text style={styles.passwordTitle}>パスワード変更</Text>
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeButtonText}>変更</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: designTokens.colors.background.secondary },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
    paddingBottom: 10,
    backgroundColor: designTokens.colors.background.primary,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 1,
    color: designTokens.colors.text.primary,
  },
  scroll: { flex: 1 },
  content: {
    padding: 20,
  },
  passwordCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  passwordTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: designTokens.colors.text.primary,
    marginBottom: 16,
  },
  changeButton: {
    backgroundColor: '#22c3ff',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  changeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default MyPageScreen;
