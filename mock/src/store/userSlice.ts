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
}

const initialState: UserState = {
  me: null,
  users: [],
  following: {},
  followRequests: [],
  points: 50,
  ownedStamps: [],
  activeUserId: null
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
    }
  }
});

export const { setMe, setUsers, addUser, toggleFollow, setFollowRequests, acceptFollowRequest, rejectFollowRequest, addPoints, purchaseStamp, setActiveUserId } = userSlice.actions;
export default userSlice.reducer;
