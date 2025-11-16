# LIFE - モバイルチャットアプリ

## プロジェクト構造

```
life-mobile/
├── index.html                          # エントリーポイント
├── src/
│   ├── App.jsx                        # メインアプリケーションコンポーネント
│   ├── components/
│   │   ├── common/                    # 共通コンポーネント
│   │   │   ├── Icons.jsx              # SVGアイコン集
│   │   │   └── Layout.jsx             # Header, BottomNav
│   │   └── screens/                   # 画面コンポーネント
│   │       ├── LoginScreen.jsx        # ログイン画面
│   │       ├── ChatListScreen.jsx     # チャット一覧
│   │       ├── ChatDetailScreen.jsx   # チャット詳細
│   │       ├── CommunityDetailScreen.jsx  # コミュニティ詳細
│   │       ├── SearchScreen.jsx       # 検索画面
│   │       ├── UserProfileView.jsx    # ユーザープロフィール表示
│   │       ├── MyPageScreen.jsx       # マイページ
│   │       ├── FollowRequestsScreen.jsx   # フォローリクエスト
│   │       ├── EditProfileScreen.jsx  # プロフィール編集
│   │       └── StampShopScreen.jsx    # スタンプショップ
│   ├── data/
│   │   └── mockData.js                # モックデータ
│   └── styles/
│       └── styles.css                 # グローバルスタイル
└── life-wireframe-v2 (3).html         # 元の統合ファイル（参考用）
```

## コンポーネント構成

### 共通コンポーネント (`src/components/common/`)

- **Icons.jsx**: すべてのSVGアイコンを管理
- **Layout.jsx**: Header と BottomNav の共通レイアウトコンポーネント

### 画面コンポーネント (`src/components/screens/`)

各画面が独立したコンポーネントファイルとして管理されています：

1. **LoginScreen** - ログイン/新規登録
2. **ChatListScreen** - フォロー中/グループチャット一覧
3. **ChatDetailScreen** - 1対1チャット画面
4. **CommunityDetailScreen** - グループチャット詳細
5. **SearchScreen** - ユーザー検索
6. **UserProfileView** - ユーザープロフィール表示
7. **MyPageScreen** - マイページ
8. **FollowRequestsScreen** - フォローリクエスト管理
9. **EditProfileScreen** - プロフィール編集
10. **StampShopScreen** - スタンプ購入

## 使い方

1. ブラウザで `index.html` を開く
2. ローカルサーバーで実行する場合：
   ```bash
   # Python 3の場合
   python -m http.server 8000
   
   # Node.jsのhttp-serverを使う場合
   npx http-server
   ```

## 保守性の向上ポイント

### 1. モジュール化
- 各画面が独立したファイルで管理
- 責任の分離が明確

### 2. 再利用可能なコンポーネント
- アイコンは1つのファイルで一元管理
- Header と BottomNav は共通コンポーネント化

### 3. データの分離
- モックデータは独立したファイルで管理
- 将来的にAPIへの置き換えが容易

### 4. スタイルの分離
- CSSは独立したファイルで管理
- インラインスタイルと組み合わせて柔軟に対応

## 今後の拡張案

### 短期的な改善
- [ ] カスタムフックの導入（useAuth, useChat等）
- [ ] コンテキストAPI でグローバルステート管理
- [ ] TypeScriptへの移行

### 中期的な改善
- [ ] APIとの統合
- [ ] ルーティングライブラリの導入（React Router）
- [ ] 状態管理ライブラリの導入（Redux, Zustand等）
- [ ] テストの追加（Jest, React Testing Library）

### 長期的な改善
- [ ] PWA化
- [ ] オフライン対応
- [ ] リアルタイム通信（WebSocket）
- [ ] ビルドシステムの導入（Vite, Next.js等）

## 開発のベストプラクティス

1. **単一責任の原則**: 各コンポーネントは1つの機能に集中
2. **DRY原則**: 共通のコードは再利用可能なコンポーネントに抽出
3. **命名規則**: 
   - コンポーネント: PascalCase
   - ファイル: コンポーネント名.jsx
   - データファイル: camelCase.js
4. **フォルダ構成**: 機能ごとに整理

## ライセンス

Private Project
