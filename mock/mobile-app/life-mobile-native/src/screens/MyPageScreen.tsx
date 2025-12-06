import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useLoggedIn } from '../src/store/authState';
import { useTranslation } from 'react-i18next';
import { designTokens } from '@styles/designTokens.native';

const MyPageScreen: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const isLoggedIn = useLoggedIn();

  return (
    <SafeAreaView style={styles.root}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>マイページ</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.content}>
          {isLoggedIn ? (
            <>
              <Text style={styles.sectionTitle}>マイページ</Text>
              {/* 上段グリッド */}
              <View style={styles.gridRow}>
                <TouchableOpacity style={styles.gridCard}>
                  <View style={[styles.iconCircle, { backgroundColor: '#cce7ff' }]} />
                  <Text style={styles.gridLabel}>プロフィール</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gridCard}>
                  <View style={[styles.iconCircle, { backgroundColor: '#ffd6d6' }]} />
                  <Text style={styles.gridLabel}>フレンド申請</Text>
                  <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
                </TouchableOpacity>
              </View>
              {/* 中段グリッド */}
              <View style={styles.gridRow}>
                <TouchableOpacity style={styles.gridCard}>
                  <View style={[styles.iconCircle, { backgroundColor: '#ffe9a8' }]} />
                  <Text style={styles.gridLabel}>スタンプ購入</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gridCard}>
                  <View style={[styles.iconCircle, { backgroundColor: '#e3d5ff' }]} />
                  <Text style={styles.gridLabel}>言語設定</Text>
                </TouchableOpacity>
              </View>
              {/* 下段グリッド */}
              <View style={styles.gridRow}>
                <TouchableOpacity style={styles.gridCard}>
                  <View style={[styles.iconCircle, { backgroundColor: '#cce7ff' }]} />
                  <Text style={styles.gridLabel}>パスワード変更</Text>
                </TouchableOpacity>
              </View>
              {/* アクションカード */}
              <TouchableOpacity style={stylesaction.actionCard}>
                <Text style={stylesaction.actionText}>↪︎ ログアウト</Text>
              </TouchableOpacity>
              <TouchableOpacity style={stylesaction.actionCardDanger}>
                <Text style={stylesaction.actionTextDanger}>🛡 退会（アカウント削除）</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.preloginCta}
                onPress={() => router.replace({ pathname: '/chat', params: { openSignup: 'true' } })}
              >
                <Text style={styles.preloginCtaText}>新規登録 / ログイン</Text>
              </TouchableOpacity>
              <View style={styles.langCard}>
                <View style={[styles.iconCircle, { backgroundColor: '#e3d5ff' }]} />
                <Text style={styles.langLabel}>言語設定 / Language</Text>
                <Text style={styles.langArrow}>›</Text>
              </View>
            </>
          )}
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
  content: { padding: 20 },
  sectionTitle: { fontSize: 24, fontWeight: '800', color: designTokens.colors.text.primary, marginBottom: 16 },
  gridRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  gridCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
    position: 'relative',
  },
  iconCircle: { width: 48, height: 48, borderRadius: 24, marginBottom: 12 },
  gridLabel: { fontSize: 14, fontWeight: '800', color: designTokens.colors.text.primary },
  badge: { position: 'absolute', right: 10, top: 10, backgroundColor: '#ff4d4f', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { color: '#fff', fontWeight: '800', fontSize: 12 },
  // pre-login
  preloginCta: { backgroundColor: '#22c3ff', borderRadius: 16, paddingVertical: 16, alignItems: 'center', marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } },
  preloginCtaText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  langCard: { backgroundColor: '#fff', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  langLabel: { flex: 1, marginLeft: 12, fontSize: 16, fontWeight: '800', color: designTokens.colors.text.primary },
  langArrow: { color: '#94a3b8', fontSize: 20, fontWeight: '800' },
});

const stylesaction = StyleSheet.create({
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 12,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 1,
  },
  actionText: { color: '#ef4444', fontSize: 16, fontWeight: '800' },
  actionCardDanger: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 12,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 1,
  },
  actionTextDanger: { color: '#ef4444', fontSize: 16, fontWeight: '800' },
});

export default MyPageScreen;
