import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { designTokens } from '@styles/designTokens.native';

// NOTE: Uは変更しない → 既存のUIトーン・構成を尊重
// 画像や既存コードの構成を参考に、ネイティブ向けに移植

// 仮のデータ（後でstore連携に置換可能）
const mockUsers = [
  { id: '1', name: 'あかり', age: '20代', message: '今日は渋谷でカフェ巡り☕', image: 'https://picsum.photos/seed/akari/400/300' },
  { id: '2', name: 'Ren', age: '30代', message: 'React触ってます', image: 'https://picsum.photos/seed/ren/400/300' },
  { id: '3', name: 'Liam', age: '20代', message: 'Building something cool!', image: 'https://picsum.photos/seed/liam/400/300' },
  { id: '4', name: 'ゆい', age: '10代後半', message: 'アニメとゲームが好きです！', image: 'https://picsum.photos/seed/yui/400/300' },
];

const mockCommunities = [
  { id: 'c1', name: 'カフェ好き集まれ', members: 231, posts: 120, tag: '旅行', image: 'https://picsum.photos/seed/cafe/400/300' },
  { id: 'c2', name: '夜型エンジニア', members: 88, posts: 54, tag: '雑談', image: 'https://picsum.photos/seed/night/400/300' },
  { id: 'c3', name: 'ゲーム作り勉強会', members: 140, posts: 320, tag: 'ゲーム', image: 'https://picsum.photos/seed/game/400/300' },
];

const Card: React.FC<{ title: string; subtitle?: string; image: string }> = ({ title, subtitle, image }) => (
  <View style={styles.card}>
    <Image source={{ uri: image }} style={styles.cardImage} />
    <View style={styles.cardOverlay} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      {subtitle ? <Text style={styles.cardSubtitle}>{subtitle}</Text> : null}
    </View>
  </View>
);

const SectionHeader: React.FC<{ title: string; actions?: React.ReactNode }> = ({ title, actions }) => (
  <View style={styles.sectionHeaderWrap}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={{ flexDirection: 'row', gap: 12 }}>{actions}</View>
    </View>
    <View style={styles.sectionUnderline} />
  </View>
);

const ChatListScreen: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'users' | 'communities'>('users');

  return (
    <View style={styles.root}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LIFE</Text>
        <TouchableOpacity>
          <Text style={styles.headerIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* 上部タブ（画像寄せ：アクティブは太字＋下線） */}
      <View style={styles.topTabs}> 
        <TouchableOpacity onPress={() => setActiveTab('users')} style={styles.topTabItem}>
          <Text style={[styles.topTabLabel, activeTab === 'users' && styles.topTabLabelActive]}>ユーザー</Text>
          <View style={[styles.topTabIndicator, activeTab === 'users' && styles.topTabIndicatorActive]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('communities')} style={styles.topTabItem}>
          <Text style={[styles.topTabLabel, activeTab === 'communities' && styles.topTabLabelActive]}>コミュニティ</Text>
          <View style={[styles.topTabIndicator, activeTab === 'communities' && styles.topTabIndicatorActive]} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 24 }}>
        {activeTab === 'users' && (
          <View style={styles.section}>
            <SectionHeader title={'すべて'} actions={
              <TouchableOpacity style={styles.pill}><Text style={styles.pillText}>フレンド</Text></TouchableOpacity>
            } />
            <View style={styles.grid}>
              {mockUsers.map(u => (
                <Card key={u.id} title={u.message} subtitle={`${u.name} ${u.age}`} image={u.image} />
              ))}
            </View>
          </View>
        )}

        {activeTab === 'communities' && (
          <View style={styles.section}>
            <SectionHeader title={'すべて'} actions={
              <TouchableOpacity style={styles.primaryBtn}><Text style={styles.primaryBtnText}>{t('cta.create')}</Text></TouchableOpacity>
            } />
            <View style={styles.grid}>
              {mockCommunities.map(c => (
                <Card key={c.id} title={c.name} subtitle={`${c.members}人  ${c.posts}投稿`} image={c.image} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: designTokens.colors.background.primary },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12,
    borderBottomWidth: 0,
    backgroundColor: designTokens.colors.background.primary,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', letterSpacing: 1, color: designTokens.colors.text.primary },
  headerIcon: { fontSize: 20, color: '#0f172a' },
  topTabs: { flexDirection: 'row', gap: 20, justifyContent: 'flex-start', paddingHorizontal: 20, paddingBottom: 8 },
  topTabItem: { alignItems: 'center' },
  topTabLabel: { color: '#64748b', fontWeight: '700' },
  topTabLabelActive: { color: designTokens.colors.text.primary, fontWeight: '800' },
  topTabIndicator: { marginTop: 6, height: 3, width: 24, borderRadius: 2, backgroundColor: 'transparent' },
  topTabIndicatorActive: { backgroundColor: '#22c3ff' },
  scroll: { flex: 1 },
  section: { paddingHorizontal: 20, paddingTop: 12 },
  sectionHeaderWrap: { marginBottom: 12 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: designTokens.colors.text.primary },
  sectionUnderline: { marginTop: 8, height: 4, width: 40, borderRadius: 2, backgroundColor: '#e2e8f0' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  card: { width: '48%', borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff', marginBottom: 12, position: 'relative',
    borderWidth: 1, borderColor: '#e5e7eb',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 3 }, elevation: 1 },
  cardImage: { width: '100%', height: 150 },
  cardOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
    backgroundColor: 'transparent' },
  cardContent: { position: 'absolute', bottom: 10, left: 10, right: 10 },
  cardTitle: { color: '#fff', fontWeight: '800', fontSize: 16, textShadowColor: 'rgba(0,0,0,0.4)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },
  cardSubtitle: { color: '#fff', marginTop: 6, fontSize: 13, textShadowColor: 'rgba(0,0,0,0.4)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },
  pill: { backgroundColor: '#f1f5f9', borderRadius: 999, paddingVertical: 6, paddingHorizontal: 12 },
  pillText: { color: '#475569', fontWeight: '700' },
  primaryBtn: { backgroundColor: '#22c3ff', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16 },
  primaryBtnText: { color: '#fff', fontWeight: '800' },
  // bottomNavWrap: 削除（タブバー重複回避）
});

export default ChatListScreen;
