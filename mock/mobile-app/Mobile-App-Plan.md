# LIFE Mobile アプリ化方針（React Native）

## 目的
- 既存の React Web UI をベースに、React Native でモバイルアプリ（iOS/Android）へ展開する。
- 体験の一貫性（色/半径/影/トークン/アイコン）を保ちつつ、モバイル特有のナビゲーションとパフォーマンスに最適化する。

## 技術選定
- フレームワーク: React Native（Expo でのセットアップを推奨）
- 状態管理: Redux Toolkit（既存 store の再利用）
- ナビゲーション: React Navigation（Stack + Tab 構成）
- UI/スタイル: StyleSheet + デザイントークン移植（global.css の代替として JS トークン）
- アイコン: `react-native-svg` + カスタムアイコン（既存 `IconBase` を移植）
- ネットワーク/API: `fetch` or `axios`（必要に応じて）
- 認証: 既存の `session.ts` 相当を RN 環境へ（SecureStore/AsyncStorage）
- 多言語対応: `i18next` + `react-i18next`（ja/en 想定、後から拡張可能）

## アーキテクチャ
- `mobile-app/`
  - `src/`
    - `components/`（Button, Header, BottomNav など RN版）
    - `screens/`（ChatList, ChatDetail, GroupChat, MyPage など RN版）
    - `store/`（Web版の slice をほぼ共通化）
    - `styles/`（designTokens.ts を RN対応に再エクスポート）
    - `navigation/`（Stack/Tab ナビゲーション定義）
    - `utils/`（session 管理、型など）
    - `i18n/`（`index.ts` 初期化・言語JSON配置）
  - `App.tsx`（エントリ）

## 画面遷移（暫定）
- Tabs: `Chat`, `Community`, `MyPage`
- Stacks:
  - ChatStack: ChatList → ChatDetail
  - CommunityStack: CommunitySearch → GroupChat
  - MyPageStack: MyPage → Modals（Profile, Language, Password）

## コンポーネント移植方針
- JSX構造は踏襲しつつ、スタイルは `StyleSheet.create` へ置換。
- `div/button/input` などの DOM 要素は `View/Text/Pressable/TextInput/Image` へ置換。
- モーダルは `react-native-modal` もしくは `Modal` + `Animated` で実装。
- アイコン群は RN向けに `Svg` を用い、既存のパスを `IconBase` から供給。

## デザイントークン
- `src/styles/designTokens.native.ts` として、Web版 `designTokens.ts` をベースに値を流用。
- 影（shadow）は `elevation` と `shadowColor`/`shadowOpacity` 等で近似表現。

## 多言語対応（i18n）
- ライブラリ: `i18next` + `react-i18next`
- 初期言語: 日本語（ja）、英語（en）
- 構成: `src/i18n/index.ts` で初期化し、`src/i18n/locales/{ja,en}.json` に文言を分割管理。
- 画面/コンポーネントでは `useTranslation()` を使用し、`t('key.path')` で参照。
- 言語切替は `Language` 画面から `i18n.changeLanguage('en')` などで実行。

### 文言キーの方針
- `screen.chat.title`, `screen.mypage.password.change` など階層で整理。
- ボタンラベルは `cta.*`、メッセージは `msg.*` で統一。

## モジュール分割と可読性向上
- ルール: 画面は `screens/*` に一画面一ファイル、複雑なUIは `components/*` へ切り出す。
- スタイル: 画面の直下で `styles.ts` を分けるか、`StyleSheet.create` を使い構造化（セクション単位）。
- ロジック: 画面ロジック（ハンドラ・フック）と表示（JSX）を区別し、可能ならカスタムフックへ分離。
- アイコン: 共通 `IconBase` でサイズ/カラーを統一し、個別アイコンは薄いラッパに留める。
- テキスト: 直書き禁止。全て `t()`で取得し、テスト容易性を確保。

## 状態管理
- 既存 `store/` の slice 定義（userSlice, communitySlice, chatSlice, uiSlice）を RN でも再利用可能。
- 差異が出る UI 分岐（モーダル開閉等）は RN向けに `uiSlice` のフラグを維持。

## データ永続化
- セッション情報・簡易パスワード等は開発中は AsyncStorage。将来的に SecureStore へ移行。

## 最小 MVP スコープ
- 画面: ChatList, ChatDetail, GroupChat, MyPage
- コンポーネント: Button, Header, BottomNav
- 機能: コミュニティ検索表示、作成モーダル、ブロック、コミュニティ退出、パスワード変更、言語切替（ja/en）

## リスク/課題
- Webのインラインスタイルを RN へ素直に移すと冗長になりがち → 共通スタイル化。
- アイコン描画の移植コスト（SVGパス） → 要段階的移行。
- ナビゲーションの差異（push/pop vs UIフラグ） → 設計統合が必要。

## 次アクション
1. RNプロジェクト最低限の構成を `mobile-app/src` に作成（仮置きコンポーネント/画面）。
2. デザイントークンのネイティブ版を準備。
3. i18n 初期化（`i18n/index.ts` とロケールJSONの配置）。
4. 既存の `uiSlice` と連携する最小ナビゲーションを用意。
5. 画面毎に主要 UI を移植（まずは MyPage と ChatList）。
