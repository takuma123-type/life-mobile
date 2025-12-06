import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  language: 'ja' | 'en';
}

const initialState: UiState = {
  language: 'ja'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<'ja' | 'en'>) {
      state.language = action.payload;
    }
  }
});

export const { setLanguage } = uiSlice.actions;
export default uiSlice.reducer;
