import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  id: string;
  name: string;
  age?: string;
  region?: string;
  city?: string;
  message?: string;
  bio?: string;
  avatar?: string;
  verified?: boolean;
  online?: boolean;
  country?: string;
  // 以下は登録・編集画面で追加される拡張フィールド
  activeTime?: string; // よく使う時間帯
  gallery?: string[];  // 画像ギャラリー
  phone?: string;      // デモ用: 認証済電話番号
  password?: string;   // デモ用: 簡易パスワード（本番では保持しない）
}

export interface FollowRequest {
  id: string;
  userId: string;
  name: string;
  age?: string;
  message?: string;
  avatar?: string;
}

export interface StampPack {
  id: string;
  name: string;
  description: string;
  price: number;
  count: number;
  thumbnail?: string;
}

interface UserState {
  me: UserProfile | null;
  users: UserProfile[];
  following: Record<string, boolean>; // userId => following
  followRequests: FollowRequest[];
  points: number;
  ownedStamps: string[]; // stampPackIds
  activeUserId: string | null; // 表示中のユーザープロフィールID
  blocked: Record<string, boolean>; // userId => blocked
}

const initialState: UserState = {
  me: null,
  users: [],
  following: {},
  followRequests: [],
  points: 50,
  ownedStamps: [],
  activeUserId: null,
  blocked: {}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMe(state, action: PayloadAction<UserProfile | null>) { state.me = action.payload; },
    setUsers(state, action: PayloadAction<UserProfile[]>) { state.users = action.payload; },
    addUser(state, action: PayloadAction<UserProfile>) { state.users.unshift(action.payload); },
    toggleFollow(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.following[id] = !state.following[id];
    },
    setFollowRequests(state, action: PayloadAction<FollowRequest[]>) { state.followRequests = action.payload; },
    acceptFollowRequest(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.followRequests = state.followRequests.filter(r=> r.id !== id);
      state.following[id] = true;
    },
    rejectFollowRequest(state, action: PayloadAction<string>) {
      state.followRequests = state.followRequests.filter(r=> r.id !== action.payload);
    },
    addPoints(state, action: PayloadAction<number>) {
      state.points += action.payload;
    },
    purchaseStamp(state, action: PayloadAction<{ stampId: string, price: number }>) {
      if (state.points >= action.payload.price) {
        state.points -= action.payload.price;
        state.ownedStamps.push(action.payload.stampId);
      }
    },
    setActiveUserId(state, action: PayloadAction<string | null>) {
      state.activeUserId = action.payload;
    },
    blockUser(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.blocked[id] = true;
      // フォロー状態も解除（任意の挙動）
      if (state.following[id]) delete state.following[id];
    },
    unblockUser(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.blocked[id]) delete state.blocked[id];
    },
    updatePassword(state, action: PayloadAction<{ userId: string, newPassword: string }>) {
      const { userId, newPassword } = action.payload;
      if (state.me && state.me.id === userId) {
        state.me.password = newPassword;
      }
      const target = state.users.find(u => u.id === userId);
      if (target) {
        target.password = newPassword;
      }
    }
  }
});

export const { setMe, setUsers, addUser, toggleFollow, setFollowRequests, acceptFollowRequest, rejectFollowRequest, addPoints, purchaseStamp, setActiveUserId, blockUser, unblockUser, updatePassword } = userSlice.actions;
export default userSlice.reducer;
