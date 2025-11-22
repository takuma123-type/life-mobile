import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  appTitle: string;
  theme: 'dark' | 'light';
  showSplash: boolean;
  isOnboarded: boolean; // 追加: オンボーディング完了フラグ
  currentScreen: string;
  authModalOpen: boolean;
  profileModalOpen: boolean;
  guestProfileModalOpen: boolean;
  smsModalOpen: boolean;
  smsStep: 'phone' | 'code';
  smsPhone: string;
  smsSentCode: string;
  smsVerified: boolean;
  registrationPendingCallback?: (() => void) | null;
  isAuthenticated: boolean;
  isRegistered: boolean;
  languageModalOpen: boolean;
  language: 'ja' | 'en';
  loginModalOpen: boolean;
}

const initialState: UIState = {
  appTitle: 'LIFE',
  theme: 'dark',
  showSplash: true,
  isOnboarded: false,
  currentScreen: 'chat',
  authModalOpen: false,
  profileModalOpen: false,
  guestProfileModalOpen: false,
  smsModalOpen: false,
  smsStep: 'phone',
  smsPhone: '',
  smsSentCode: '',
  smsVerified: false,
  registrationPendingCallback: null,
  isAuthenticated: false,
  isRegistered: false,
  languageModalOpen: false,
  language: 'ja',
  loginModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    hideSplash(state) { state.showSplash = false; },
    setOnboarded(state, action: PayloadAction<boolean>) { state.isOnboarded = action.payload; },
    setTheme(state, action: PayloadAction<'dark' | 'light'>) { state.theme = action.payload; },
    navigate(state, action: PayloadAction<string>) { state.currentScreen = action.payload; },
    openAuthModal(state) { state.authModalOpen = true; },
    closeAuthModal(state) { state.authModalOpen = false; },
    openProfileModal(state) { state.profileModalOpen = true; },
    closeProfileModal(state) { state.profileModalOpen = false; },
    openGuestProfileModal(state) { state.guestProfileModalOpen = true; },
    closeGuestProfileModal(state) { state.guestProfileModalOpen = false; },
    openSmsModal(state) { state.smsModalOpen = true; state.smsStep = 'phone'; },
    closeSmsModal(state) { state.smsModalOpen = false; },
    setSmsPhone(state, action: PayloadAction<string>) { state.smsPhone = action.payload; },
    setSmsStep(state, action: PayloadAction<'phone'|'code'>) { state.smsStep = action.payload; },
    setSmsSentCode(state, action: PayloadAction<string>) { state.smsSentCode = action.payload; },
    setSmsVerified(state, action: PayloadAction<boolean>) { state.smsVerified = action.payload; },
    setAuthCallback(state, action: PayloadAction<(() => void) | null>) { state.registrationPendingCallback = action.payload; },
    setAuthenticated(state, action: PayloadAction<boolean>) { state.isAuthenticated = action.payload; },
    setRegistered(state, action: PayloadAction<boolean>) { state.isRegistered = action.payload; },
    runAuthCallback(state) {
      if (state.registrationPendingCallback) {
        state.registrationPendingCallback();
        state.registrationPendingCallback = null;
      }
    },
    openLanguageModal(state) { state.languageModalOpen = true; },
    closeLanguageModal(state) { state.languageModalOpen = false; },
    setLanguage(state, action: PayloadAction<'ja' | 'en'>) { state.language = action.payload; },
    openLoginModal(state) { state.loginModalOpen = true; },
    closeLoginModal(state) { state.loginModalOpen = false; },
  }
});

export const { hideSplash, setOnboarded, setTheme, navigate, openAuthModal, closeAuthModal, openProfileModal, closeProfileModal, openGuestProfileModal, closeGuestProfileModal, openSmsModal, closeSmsModal, setSmsPhone, setSmsStep, setSmsSentCode, setSmsVerified, setAuthCallback, setAuthenticated, setRegistered, runAuthCallback, openLanguageModal, closeLanguageModal, setLanguage, openLoginModal, closeLoginModal } = uiSlice.actions;
export default uiSlice.reducer;
