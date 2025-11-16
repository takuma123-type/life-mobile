import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import userReducer from './userSlice';
import chatReducer from './chatSlice';
import communityReducer from './communitySlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    chats: chatReducer,
    communities: communityReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
