import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { designTokens } from '@styles/designTokens.native';

const Row: React.FC<{ label: string; value?: string; onPress?: () => void; required?: boolean }>
= ({ label, value = '未設定', onPress, required }) => {
  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={styles.rowRight}>
        {required && <View style={styles.requiredBadge}><Text style={styles.requiredBadgeText}>必須</Text></View>}
        <Text style={styles.rowValue}>{value}</Text>
        <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  );
};

export const ProfileRegistrationScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [iconSet, setIconSet] = React.useState(false);
  const [username, setUsername] = React.useState<string | null>(null);
  const [ageRange, setAgeRange] = React.useState<string | null>(null);

  const isValid = iconSet && !!username && !!ageRange;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>プロフィールを登録してください</Text>
        </View>

        <View style={styles.card}>
          <Row label="ユーザーアイコン" required value={iconSet ? '設定済み' : '未設定'} onPress={() => setIconSet(true)} />
          <View style={styles.divider} />
          <Row label="ユーザー名" required value={username ?? '未設定'} onPress={() => setUsername('仮のユーザー名')} />
          <View style={styles.divider} />
          <Row label="年代" required value={ageRange ?? '未設定'} onPress={() => setAgeRange('20代')} />
          <View style={styles.divider} />
          <Row label="居住地" />
          <View style={styles.divider} />
          <Row label="よく使う時間帯" />
          <View style={styles.divider} />
          <Row label="自己紹介" />
          <View style={styles.divider} />
          <Row label="ギャラリー" />
        </View>

        <View style={styles.noteWrap}>
          <Text style={styles.noteText}>※内容はあとから変更可能です</Text>
          {!isValid && (
            <Text style={styles.errorText}>ユーザーアイコン・ユーザー名・年代は必須です</Text>
          )}
        </View>
      </ScrollView>

      <View style={[styles.bottomWrap, { paddingBottom: Math.max(insets.bottom, 16) }] }>
        <TouchableOpacity
          style={[styles.primaryButton, !isValid && styles.primaryButtonDisabled]}
          activeOpacity={0.9}
          disabled={!isValid}
          onPress={() => {
            // ログイン完了後の導線: チャット画面へ遷移し、トークタブを初期選択
            router.replace({ pathname: '/chat', params: { initialFilter: 'friends', loggedIn: 'true' } });
          }}
        >
          <Text style={styles.primaryButtonText}>保存して次へ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: designTokens.colors.background.primary },
  header: { paddingTop: 24, paddingHorizontal: 20, paddingBottom: 12 },
  title: { fontSize: 22, fontWeight: '800', color: designTokens.colors.text.primary },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  rowLabel: { fontSize: 16, fontWeight: '700', color: designTokens.colors.text.primary },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rowValue: { fontSize: 14, color: '#9ca3af', fontWeight: '700' },
  requiredBadge: { backgroundColor: '#fee2e2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginRight: 8 },
  requiredBadgeText: { color: '#ef4444', fontSize: 12, fontWeight: '800' },
  divider: { height: 1, backgroundColor: '#f1f5f9', marginHorizontal: 20 },
  noteWrap: { paddingHorizontal: 20, paddingTop: 16 },
  noteText: { fontSize: 12, color: '#9ca3af' },
  errorText: { marginTop: 8, fontSize: 12, color: '#ef4444', fontWeight: '700' },

  bottomWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: designTokens.colors.background.primary,
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: '#22c3ff',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  primaryButtonDisabled: {
    backgroundColor: '#93c5fd',
    shadowOpacity: 0.06,
  },
  primaryButtonText: { color: '#fff', fontSize: 18, fontWeight: '800' },
});

export default ProfileRegistrationScreen;
