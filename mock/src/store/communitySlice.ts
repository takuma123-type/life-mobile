import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Community {
  id: string;
  name: string;
  category?: string;
  members?: number;
  posts?: number;
  desc?: string;
}

interface CommunityState {
  list: Community[];
  activeCommunityId: string | null;
  joined: Record<string, boolean>; // communityId => joined
}

const initialState: CommunityState = {
  list: [],
  activeCommunityId: null,
  joined: {}
};

const communitySlice = createSlice({
  name: 'communities',
  initialState,
  reducers: {
    setCommunities(state, action: PayloadAction<Community[]>) { state.list = action.payload; },
    setActiveCommunity(state, action: PayloadAction<string | null>) { state.activeCommunityId = action.payload; },
    toggleJoin(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.joined[id] = !state.joined[id];
    }
  }
});

export const { setCommunities, setActiveCommunity, toggleJoin } = communitySlice.actions;
export default communitySlice.reducer;
