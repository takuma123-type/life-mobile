// Language settings and translations
const translations = {
    ja: {
        // Common
        close: '閉じる',
        cancel: 'キャンセル',
        save: '保存',
        edit: '編集',
        translate: '翻訳',
        original: '原文',
        
        // Profile
        profile: 'プロフィール',
        basicInfo: '基本情報',
        age: '年代',
        country: '国',
        activeTime: 'よく使う時間帯',
        bio: '自己紹介',
        gallery: 'ギャラリー',
        friendRequest: 'フレンド申請',
        friend: 'フレンド',
        sendMessage: 'メッセージを送る',
        
        // Settings
        settings: '設定',
        language: '言語設定',
        japanese: '日本語',
        english: 'English',
    },
    en: {
        // Common
        close: 'Close',
        cancel: 'Cancel',
        save: 'Save',
        edit: 'Edit',
        translate: 'Translate',
        original: 'Original',
        
        // Profile
        profile: 'Profile',
        basicInfo: 'Basic Info',
        age: 'Age',
        country: 'Country',
        activeTime: 'Active Time',
        bio: 'Bio',
        gallery: 'Gallery',
        friendRequest: 'Add Friend',
        friend: 'Friend',
        sendMessage: 'Send Message',
        
        // Settings
        settings: 'Settings',
        language: 'Language',
        japanese: '日本語',
        english: 'English',
    }
};

// Language state (グローバル)
let currentLanguage = 'ja';
const languageListeners = [];

const LanguageManager = {
    getLanguage: () => currentLanguage,
    
    setLanguage: (lang) => {
        currentLanguage = lang;
        localStorage.setItem('app_language', lang);
        languageListeners.forEach(listener => listener(lang));
    },
    
    subscribe: (listener) => {
        languageListeners.push(listener);
        return () => {
            const index = languageListeners.indexOf(listener);
            if (index > -1) {
                languageListeners.splice(index, 1);
            }
        };
    },
    
    t: (key) => {
        return translations[currentLanguage]?.[key] || translations.ja[key] || key;
    },
    
    translateText: async (text, fromLang, toLang) => {
        // 実際の実装ではGoogle Translate APIなどを使用
        // ここではシミュレーション
        return new Promise((resolve) => {
            setTimeout(() => {
                if (toLang === 'ja') {
                    resolve(`[日本語訳] ${text}`);
                } else {
                    resolve(`[English] ${text}`);
                }
            }, 300);
        });
    }
};

// 初期化
const savedLang = localStorage.getItem('app_language');
if (savedLang) {
    currentLanguage = savedLang;
}
