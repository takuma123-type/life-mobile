# LIFE Mobile (React Native)

## セットアップ（Expo）

```bash
# 新規Expoプロジェクト（未作成なら）
npx create-expo-app life-mobile-native
cd life-mobile-native

# ナビゲーション
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context

# 状態管理
npm install @reduxjs/toolkit react-redux

# i18n
npm install i18next react-i18next

# SVGアイコン（必要に応じて）
npx expo install react-native-svg

# 起動
npm run start
```

## ディレクトリ構成
- `mobile-app/App.tsx`: エントリ。Redux `Provider` とナビゲーション設定を読み込み。
- `mobile-app/src/navigation/`: Stack/Tab ナビゲーション定義。
- `mobile-app/src/components/`: RN用の共通UI（Button, Header, BottomNav）。
- `mobile-app/src/screens/`: 画面雛形（ChatList/ChatDetail/CommunitySearch/GroupChat/MyPage）。
- `mobile-app/src/styles/designTokens.native.ts`: デザイントークン（色/半径/スペーシング）。
- `mobile-app/src/store/`: Reduxストア（今後 slice を追加）。
- `mobile-app/src/i18n/`: i18n 初期化とロケールJSON。

## i18nの使い方
- 初期化: `App.tsx` で `import './src/i18n'` を実行。
- ロケール: `src/i18n/locales/ja.json`, `en.json` に文言を管理。
- 取得: 画面/コンポーネントで `const { t } = useTranslation();` → `t('screen.mypage.title')` など。
- 切替: `i18n.changeLanguage('en')` で英語へ変更。

### 文言キー方針
- 画面タイトル: `screen.<name>.title`
- マイページの項目: `screen.mypage.*`
- CTAボタン: `cta.*`
- メッセージ/アラート: `msg.*`

## 今後の実装
- Redux slice をRN側へ移植（user/ui/chat/community）
- 既存Web UIの主要画面をRNコンポーネントへ置換（モーダル/カード/リスト）
- アイコン群の `react-native-svg` 化
- AsyncStorage/SecureStore によるセッション管理
