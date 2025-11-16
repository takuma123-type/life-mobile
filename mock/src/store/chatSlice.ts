import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChatMessage {
  id: string;
  sender: 'me' | string; // user id
  message: string;
  time: string;
}

interface ChatState {
  messages: Record<string, ChatMessage[]>; // key: userId or communityId
  activeChatId: string | null;
}

const initialState: ChatState = {
  messages: {},
  activeChatId: null
};

const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setActiveChat(state, action: PayloadAction<string | null>) { state.activeChatId = action.payload; },
    seedMessages(state, action: PayloadAction<{ chatId: string; messages: ChatMessage[] }>) {
      state.messages[action.payload.chatId] = action.payload.messages;
    },
    pushMessage(state, action: PayloadAction<{ chatId: string; message: ChatMessage }>) {
      if (!state.messages[action.payload.chatId]) state.messages[action.payload.chatId] = [];
      state.messages[action.payload.chatId].push(action.payload.message);
    }
  }
});

export const { setActiveChat, seedMessages, pushMessage } = chatSlice.actions;
export default chatSlice.reducer;
