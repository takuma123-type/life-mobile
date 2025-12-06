import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Keyboard } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { designTokens } from '@styles/designTokens.native';
import SearchIcon from '../components/icons/SearchIcon';
import { SignupModal } from '../components/SignupModal';
import { LoginModal } from '../components/LoginModal';
import { VerificationModal } from '../components/VerificationModal';
import { Toast } from '../components/Toast';

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

const Card: React.FC<{ title: string; subtitle?: string; image: string; isUserCard?: boolean; onPress?: () => void }> = ({ title, subtitle, image, onPress }) => {
  const parts = subtitle ? subtitle.split(' ') : [];
  const name = parts[0] || '';
  const age = parts.slice(1).join(' ') || '';
  
  return (
    <TouchableOpacity style={styles.userCard} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.userCardImageContainer}>
        <Image source={{ uri: image }} style={styles.userCardImage} />
        <View style={styles.userCardOverlay} />
        <Text style={styles.userCardTitle} numberOfLines={2}>{title}</Text>
      </View>
      <View style={styles.userCardInfo}>
        <Text style={styles.userCardName}>{name}</Text>
        {age ? <Text style={styles.userCardAge}> {age}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

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
  const [userFilter, setUserFilter] = useState<'all' | 'friends'>('all');
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showToast, setShowToast] = useState(false);
  // Debug state transitions
  React.useEffect(() => {
    console.log('[ChatList] showSignupModal:', showSignupModal);
  }, [showSignupModal]);

  React.useEffect(() => {
    console.log('[ChatList] showVerificationModal:', showVerificationModal, 'phoneNumber:', phoneNumber);
  }, [showVerificationModal, phoneNumber]);

  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.root}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LIFE</Text>
        <TouchableOpacity style={styles.headerAction}>
          <SearchIcon size={22} color="#0f172a" />
        </TouchableOpacity>
      </View>

      {/* 上部タブ（画像寄せ：アクティブは太字＋下線） */}
      <View style={styles.topTabsContainer}>
        <View style={styles.topTabs}> 
          <TouchableOpacity
            onPress={() => setActiveTab('users')}
            style={styles.topTabItem}
            hitSlop={{ top: 8, bottom: 8, left: 16, right: 16 }}
          >
            <Text style={[styles.topTabLabel, activeTab === 'users' && styles.topTabLabelActive]}>ユーザー</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('communities')}
            style={styles.topTabItem}
            hitSlop={{ top: 8, bottom: 8, left: 16, right: 16 }}
          >
            <Text style={[styles.topTabLabel, activeTab === 'communities' && styles.topTabLabelActive]}>コミュニティ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabUnderlineContainer}>
          <View style={styles.tabDivider} />
          <View style={[styles.tabActiveUnderline, activeTab === 'users' ? styles.tabUnderlineLeft : styles.tabUnderlineRight]} />
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 24 }}>
        {activeTab === 'users' && (
          <View style={styles.section}>
            <View style={styles.userFilterButtons}>
              <TouchableOpacity 
                style={[styles.filterBtn, userFilter === 'all' && styles.filterBtnActive]}
                onPress={() => setUserFilter('all')}
              >
                <Text style={[styles.filterBtnText, userFilter === 'all' && styles.filterBtnTextActive]}>すべて</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterBtn, userFilter === 'friends' && styles.filterBtnActive]}
                onPress={() => setUserFilter('friends')}
              >
                <Text style={[styles.filterBtnText, userFilter === 'friends' && styles.filterBtnTextActive]}>トーク</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.userGrid}>
              {mockUsers.map(u => (
                <Card 
                  key={u.id} 
                  title={u.message} 
                  subtitle={`${u.name} ${u.age}`} 
                  image={u.image} 
                  isUserCard={true}
                  onPress={() => {
                    console.log('[ChatList] User card pressed:', u.id);
                    setShowSignupModal(true);
                  }}
                />
              ))}
            </View>
          </View>
        )}

        {activeTab === 'communities' && (
          <View style={styles.section}>
            <View style={styles.communityHeader}>
              <View style={styles.filterButtons}>
                <TouchableOpacity style={[styles.filterBtn, styles.filterBtnActive]}>
                  <Text style={[styles.filterBtnText, styles.filterBtnTextActive]}>すべて</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterBtn}>
                  <Text style={styles.filterBtnText}>トーク</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.createBtn}>
                <Text style={styles.createBtnText}>{t('cta.create')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.userGrid}>
              {mockCommunities.map(c => (
                <Card 
                  key={c.id} 
                  title={c.name} 
                  subtitle={`${c.members}人  ${c.posts}投稿`} 
                  image={c.image} 
                  isUserCard={true}
                  onPress={() => {
                    console.log('[ChatList] Community card pressed:', c.id);
                    setShowSignupModal(true);
                  }}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
      
      <SignupModal 
        visible={showSignupModal && !showVerificationModal} 
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
        onSubmitted={(phone) => {
          console.log('[ChatList] onSubmitted called with phone:', phone);
          setPhoneNumber(phone);
          // 先に新規登録モーダルを閉じる（アニメーション終了後に次モーダルを開く）
          setShowSignupModal(false);
          // 念のためキーボードを閉じる（iOSでのレイアウト押し上げ対策）
          Keyboard.dismiss();
          // RNのModalは連続表示/非表示で稀に表示イベントが落ちることがあるため、少し遅延して開く
          setTimeout(() => {
            console.log('[ChatList] Opening VerificationModal after delay');
            setShowVerificationModal(true);
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 2000);
          }, 300);
        }}
      />
      
      <LoginModal 
        visible={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
      />

      <Toast visible={showToast} message="送信成功しました" type="success" />

      <VerificationModal
        visible={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        phoneNumber={phoneNumber}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: designTokens.colors.background.primary },
  header: {
    alignItems: 'center', justifyContent: 'center',
    paddingTop: 6, paddingBottom: 10,
    borderBottomWidth: 0,
    backgroundColor: designTokens.colors.background.primary,
    marginBottom: 8,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', letterSpacing: 1, color: designTokens.colors.text.primary },
  headerAction: { position: 'absolute', right: 16, top: '50%', transform: [{ translateY: -8 }] },
  headerIcon: { fontSize: 20, color: '#0f172a' },
  topTabsContainer: { position: 'relative' },
  topTabs: { flexDirection: 'row', gap: 24, justifyContent: 'center', paddingHorizontal: 20, paddingTop: 4, paddingBottom: 10, marginBottom: 8 },
  topTabItem: { alignItems: 'center', paddingVertical: 8, paddingHorizontal: 32, borderRadius: 8 },
  topTabLabel: { color: '#64748b', fontWeight: '700', fontSize: 17 },
  topTabLabelActive: { color: designTokens.colors.text.primary, fontWeight: '800', fontSize: 17 },
  tabUnderlineContainer: { position: 'relative', width: '100%', height: 3 },
  tabDivider: { position: 'absolute', top: 0, left: 0, right: 0, height: 1, backgroundColor: '#e5e7eb' },
  tabActiveUnderline: { position: 'absolute', top: 0, height: 3, backgroundColor: '#22c3ff', width: 140 },
  tabUnderlineLeft: { left: '50%', marginLeft: -152 },
  tabUnderlineRight: { left: '50%', marginLeft: 22 },
  scroll: { flex: 1 },
  section: { paddingHorizontal: 20, paddingTop: 12 },
  sectionHeaderWrap: { marginBottom: 12 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: designTokens.colors.text.primary },
  sectionUnderline: { marginTop: 8, height: 4, width: 40, borderRadius: 2, backgroundColor: '#e2e8f0' },
  userGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  userCard: { 
    width: '31.5%',
    borderRadius: 12, 
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1, 
    borderColor: '#e5e7eb',
    shadowColor: '#000', 
    shadowOpacity: 0.04, 
    shadowRadius: 2, 
    shadowOffset: { width: 0, height: 1 }, 
    elevation: 1 
  },
  userCardImageContainer: {
    width: '100%',
    height: 120,
    position: 'relative',
    overflow: 'hidden'
  },
  userCardImage: { 
    width: '100%', 
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  userCardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  userCardTitle: { 
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    fontSize: 13, 
    fontWeight: '800', 
    color: '#fff',
    lineHeight: 17,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4
  },
  userCardInfo: {
    padding: 8,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  userCardName: { 
    fontSize: 12, 
    color: designTokens.colors.text.primary,
    fontWeight: '600'
  },
  userCardAge: { 
    fontSize: 12, 
    color: designTokens.colors.text.secondary,
    fontWeight: '500'
  },

  userFilterButtons: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  communityHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  filterButtons: { flexDirection: 'row', gap: 12 },
  filterBtn: { backgroundColor: '#f1f5f9', borderRadius: 999, paddingVertical: 8, paddingHorizontal: 20 },
  filterBtnActive: { backgroundColor: '#22c3ff' },
  filterBtnText: { color: '#475569', fontWeight: '700', fontSize: 15 },
  filterBtnTextActive: { color: '#fff', fontWeight: '800' },
  createBtn: { backgroundColor: '#22c3ff', borderRadius: 999, paddingVertical: 8, paddingHorizontal: 16 },
  createBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  pill: { backgroundColor: '#f1f5f9', borderRadius: 999, paddingVertical: 6, paddingHorizontal: 12 },
  pillText: { color: '#475569', fontWeight: '700' },
  primaryBtn: { backgroundColor: '#22c3ff', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16 },
  primaryBtnText: { color: '#fff', fontWeight: '800' },
  // bottomNavWrap: 削除（タブバー重複回避）
});

export default ChatListScreen;
