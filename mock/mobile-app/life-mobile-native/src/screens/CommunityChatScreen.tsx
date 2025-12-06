import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { designTokens } from '@styles/designTokens.native';

interface Message {
  id: string;
  author: string; // 頭文字用
  name: string;
  text: string;
  time: string;
}

interface Props {
  name?: string; // コミュニティ名
  members?: number; // メンバー数
  dateLabel?: string;
}

const sampleMessages: Message[] = [
  { id: 'm1', author: '真', name: 'ユーザー', text: 'こんにちは！', time: '10:30' },
  { id: 'm2', author: 'E', name: 'Emma', text: 'Hello everyone! Nice to meet you all!', time: '10:32' },
  { id: 'm3', author: 'L', name: 'Li Wei', text: '大家好！我也喜欢动漫', time: '10:36' },
  { id: 'm4', author: 'た', name: 'たろ', text: 'いろんな国の人がいて楽しいね！', time: '10:38' },
  { id: 'm5', author: 'M', name: 'Min-jun', text: '저도 일본 애니메이션 정말 좋아해요!', time: '10:40' },
];

const CommunityChatScreen: React.FC<Props> = ({ name = 'カフェ好き集まれ', members = 231, dateLabel = '2025.11.13. 木曜日' }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const menuOpacity = React.useRef(new Animated.Value(0)).current;
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    const open = !menuOpen;
    setMenuOpen(open);
    Animated.timing(menuOpacity, { toValue: open ? 1 : 0, duration: 180, useNativeDriver: true }).start();
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }] }>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.pillBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={18} color="#111827" />
        </TouchableOpacity>
        <View style={styles.titleWrap}>
          <Text style={styles.titleText}>{name}</Text>
          <Text style={styles.subtitleText}>{members}人のメンバー</Text>
        </View>
        <TouchableOpacity style={styles.pillBtn} onPress={toggleMenu}>
          <Ionicons name="ellipsis-horizontal" size={18} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* Date badge */}
      <View style={styles.dateBadge}><Text style={styles.dateBadgeText}>{dateLabel}</Text></View>

      {/* Messages */}
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 120 }}>
        {sampleMessages.map(m => (
          <View key={m.id} style={styles.msgRow}>
            <View style={styles.avatarCircle}><Text style={styles.avatarText}>{m.author}</Text></View>
            <View style={styles.msgBubbleWrap}>
              <Text style={styles.msgAuthor}>{m.name}</Text>
              <View style={styles.msgBubble}><Text style={styles.msgText}>{m.text}</Text></View>
              <View style={styles.msgMetaRow}>
                <Text style={styles.msgTime}>{m.time}</Text>
                <TouchableOpacity style={styles.translateBtn}><Ionicons name="globe-outline" size={16} color="#fff" /><Text style={styles.translateText}>翻訳</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Attach menu */}
      {menuOpen && (
        <Animated.View style={[styles.menuSheet, { opacity: menuOpacity }] }>
          <View style={styles.menuItemRow}>
            <View style={[styles.menuIconCircle, { backgroundColor: '#10b981' }]}><Ionicons name="image" size={18} color="#fff" /></View>
            <Text style={styles.menuItemText}>画像</Text>
          </View>
          <View style={styles.menuItemRow}>
            <View style={[styles.menuIconCircle, { backgroundColor: '#f59e0b' }]}><Ionicons name="grid" size={18} color="#fff" /></View>
            <Text style={styles.menuItemText}>スタンプ</Text>
          </View>
          <View style={styles.menuItemRow}>
            <View style={[styles.menuIconCircle, { backgroundColor: '#8b5cf6' }]}><Ionicons name="document" size={18} color="#fff" /></View>
            <Text style={styles.menuItemText}>ファイル</Text>
          </View>
        </Animated.View>
      )}

      {/* Input bar */}
      <View style={[styles.inputBar, { paddingBottom: insets.bottom + 8 }] }>
        <TouchableOpacity style={styles.plusBtn} onPress={toggleMenu}>
          <Text style={styles.plusText}>＋</Text>
        </TouchableOpacity>
        <View style={styles.inputField}><Text style={styles.inputPlaceholder}>メッセージを入力…</Text></View>
        <TouchableOpacity style={styles.sendBtn}><Ionicons name="paper-plane" size={18} color="#667085" /></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#eef7ff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#fff' },
  pillBtn: { backgroundColor: '#e6f7ff', borderRadius: 999, paddingVertical: 8, paddingHorizontal: 10 },
  titleWrap: { flexDirection: 'column' },
  titleText: { fontSize: 18, fontWeight: '800', color: designTokens.colors.text.primary },
  subtitleText: { fontSize: 12, fontWeight: '700', color: '#64748b' },
  dateBadge: { alignSelf: 'center', marginTop: 12, backgroundColor: '#e1e8f0', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  dateBadgeText: { color: '#64748b', fontWeight: '700' },
  scroll: { flex: 1 },
  msgRow: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 16, marginTop: 16 },
  avatarCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#65d2ff', alignItems: 'center', justifyContent: 'center', marginRight: 12,
    shadowColor: '#22c3ff', shadowOpacity: 0.25, shadowRadius: 6, shadowOffset: { width: 0, height: 4 } },
  avatarText: { color: '#fff', fontWeight: '800' },
  msgBubbleWrap: { flex: 1 },
  msgAuthor: { color: '#64748b', fontWeight: '800', marginBottom: 6 },
  msgBubble: { backgroundColor: '#fff', borderRadius: 14, paddingVertical: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: '#e6eef7',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } },
  msgText: { color: designTokens.colors.text.primary, fontWeight: '700' },
  msgMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
  msgTime: { color: '#64748b', fontWeight: '700', fontSize: 12 },
  translateBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#22c3ff', borderRadius: 999, paddingVertical: 6, paddingHorizontal: 12,
    shadowColor: '#22c3ff', shadowOpacity: 0.35, shadowRadius: 8, shadowOffset: { width: 0, height: 6 } },
  translateText: { color: '#fff', fontWeight: '800' },
  menuSheet: { position: 'absolute', bottom: 84, left: 16, right: 16, backgroundColor: '#fff', borderRadius: 20, padding: 12,
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 10, shadowOffset: { width: 0, height: 8 }, borderWidth: 1, borderColor: '#eef2f7' },
  menuItemRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  menuIconCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  menuItemText: { color: designTokens.colors.text.primary, fontWeight: '800' },
  inputBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 8, backgroundColor: 'rgba(255,255,255,0.95)' },
  plusBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#e6f7ff', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  plusText: { color: '#22c3ff', fontWeight: '800', fontSize: 18 },
  inputField: { flex: 1, height: 42, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', justifyContent: 'center', paddingHorizontal: 16 },
  inputPlaceholder: { color: '#98a2b3', fontWeight: '700' },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
});

export default CommunityChatScreen;
