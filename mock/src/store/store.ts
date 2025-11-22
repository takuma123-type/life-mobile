import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import userReducer from './userSlice';
import chatReducer from './chatSlice';
import communityReducer from './communitySlice';
import { saveSession, clearSession, saveLanguage } from '../utils/session';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    chats: chatReducer,
    communities: communityReducer,
  }
});

// 認証状態とユーザープロフィールの自動永続化
// ログイン中 (isAuthenticated=true) かつ me が存在する場合は保存。
// ログアウト (isAuthenticated=false) の場合はセッションを削除。
let lastSerialized = '';
store.subscribe(() => {
  const state = store.getState();
  const { isAuthenticated, isRegistered } = (state as any).ui;
  const me = (state as any).user.me;
  const language = (state as any).ui.language as 'ja' | 'en';

  if (!isAuthenticated) {
    // ログアウト時クリア（一度だけ）
    if (lastSerialized !== 'loggedout') {
      clearSession();
      lastSerialized = 'loggedout';
    }
    return;
  }

  if (me) {
    // 直列化して前回と同一なら書き込み省略し、localStorage負荷を軽減
    const current = JSON.stringify({ me, isAuthenticated, isRegistered, language });
    if (current !== lastSerialized) {
      saveSession(me, isAuthenticated, isRegistered);
      saveLanguage(language);
      lastSerialized = current;
    }
  }
  // 認証済みでないが言語だけ変更されたケース
  if (!me && language && lastSerialized !== `lang:${language}` && !isAuthenticated) {
    saveLanguage(language);
    lastSerialized = `lang:${language}`;
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
