import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
import type { RootState } from './store/store';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import ChatListScreen from './screens/ChatListScreen';
import ChatDetailScreen from './screens/ChatDetailScreen';
import MyPageScreen from './screens/MyPageScreen';
import GroupChatScreen from './screens/GroupChatScreen';
import ProfileRegistrationScreen from './screens/ProfileRegistrationScreen';
import FollowRequestsScreen from './screens/FollowRequestsScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import StampShopScreen from './screens/StampShopScreen';
import MyProfileModal from './components/modals/MyProfileModal';
import GuestProfileModal from './components/modals/GuestProfileModal';
import SmsVerificationModal from './components/modals/SmsVerificationModal';
import LanguageModal from './components/modals/LanguageModal';
import LoginModal from './components/modals/LoginModal';
import FollowRequestsModal from './components/modals/FollowRequestsModal';
import { setUsers, setFollowRequests, setMe } from './store/userSlice';
import { setCommunities } from './store/communitySlice';
import { setAuthenticated, setRegistered, setLanguage } from './store/uiSlice';
import { loadSession } from './utils/session';
import { seedMessages } from './store/chatSlice';
import { mockUsers, mockCommunities, seedChat, mockFollowRequests } from './data/mockData';

const App: React.FC = () => {
  // 型解析エラー回避のため暫定 any キャスト（後でRootState改良）
  const appTitle = useAppSelector((s: any) => s.ui.appTitle);
  const current = useAppSelector((s: any) => s.ui.currentScreen);
  const showSplash = useAppSelector((s: any) => s.ui.showSplash);
  const usersLen = useAppSelector((s:any)=> s.user.users.length);
  const communitiesLen = useAppSelector((s:any)=> s.communities.list.length);
  const dispatch = useAppDispatch();

  // 初期データシード
  useEffect(() => {
    // 既存セッションのロード（初回のみ）
    const { user, isAuthenticated, isRegistered, language } = loadSession();
    if (user) {
      dispatch(setMe(user));
      dispatch(setAuthenticated(isAuthenticated));
      dispatch(setRegistered(isRegistered));
    }
    if (language) {
      dispatch(setLanguage(language));
    }

    if (usersLen === 0) {
      dispatch(setUsers(mockUsers));
      dispatch(setFollowRequests(mockFollowRequests));
      // デフォルト最初のユーザーとのチャットシード
      dispatch(seedMessages({ chatId: mockUsers[0].id, messages: seedChat }));
    }
    if (communitiesLen === 0) {
      dispatch(setCommunities(mockCommunities));
    }
  }, [usersLen, communitiesLen, dispatch]);

  if (showSplash) return <SplashScreen />;

  let screen: React.ReactNode = null;
  switch (current) {
    case 'login': screen = <LoginScreen />; break;
    case 'chat': screen = <ChatListScreen />; break;
    case 'chatDetail': screen = <ChatDetailScreen />; break;
    case 'groupChat': screen = <GroupChatScreen />; break;
    case 'mypage': screen = <MyPageScreen />; break;
    case 'followRequests': screen = <FollowRequestsScreen />; break;
    case 'stampShop': screen = <StampShopScreen />; break;
    case 'editProfile': screen = <EditProfileScreen />; break;
    case 'profileRegistration': screen = <ProfileRegistrationScreen />; break;
    default:
      screen = <div style={{ padding:24 }}><p style={{ color:'var(--color-muted)' }}>画面 '{current}' はまだ移植されていません。</p></div>;
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh', background:'var(--color-bg)' }}>
      <main style={{ flex:1 }}>{screen}</main>
      <MyProfileModal />
      <GuestProfileModal />
      <SmsVerificationModal />
      <LanguageModal />
      <LoginModal />
      <FollowRequestsModal />
    </div>
  );
};

export default App;
