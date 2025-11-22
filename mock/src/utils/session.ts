// Simple session persistence using localStorage
// Provides save, load, and clear helpers.
import type { UserProfile } from '../store/userSlice';

const USER_KEY = 'sessionUser';
const AUTH_KEY = 'sessionAuth'; // boolean isAuthenticated
const REG_KEY = 'sessionRegistered'; // boolean isRegistered
const LANG_KEY = 'prefLanguage'; // 'ja' | 'en'

export interface PersistedSession {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isRegistered: boolean;
  language?: 'ja' | 'en';
}

export function saveSession(user: UserProfile, isAuthenticated: boolean, isRegistered: boolean) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(AUTH_KEY, isAuthenticated ? '1' : '0');
    localStorage.setItem(REG_KEY, isRegistered ? '1' : '0');
  } catch (e) {
    // swallow errors (e.g., private mode) but could log
    console.warn('Failed to save session', e);
  }
}

export function loadSession(): PersistedSession {
  try {
    const rawUser = localStorage.getItem(USER_KEY);
    const auth = localStorage.getItem(AUTH_KEY) === '1';
    const reg = localStorage.getItem(REG_KEY) === '1';
    const lang = (localStorage.getItem(LANG_KEY) as 'ja' | 'en') || undefined;
    return {
      user: rawUser ? (JSON.parse(rawUser) as UserProfile) : null,
      isAuthenticated: auth,
      isRegistered: reg,
      language: lang,
    };
  } catch (e) {
    console.warn('Failed to load session', e);
    return { user: null, isAuthenticated: false, isRegistered: false };
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(REG_KEY);
    // 言語設定はユーザセッションと切り離し維持したい場合は削除しない（現在は保持）
  } catch (e) {
    console.warn('Failed to clear session', e);
  }
}

// 言語プリファレンスの保存・取得（ログイン状態に依存しない）
export function saveLanguage(lang: 'ja' | 'en') {
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) { console.warn('Failed to save language', e); }
}

export function loadLanguage(): 'ja' | 'en' | undefined {
  try { return (localStorage.getItem(LANG_KEY) as 'ja' | 'en') || undefined; } catch { return undefined; }
}
