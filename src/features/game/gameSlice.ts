import type { PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/order
import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const gameSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    generateNewBoardData: (state: CounterState) => {
      // Generate new board and feedbacks state
    },
    processWord: (state: CounterState) => {
      // Update feedback state
      // Check if game ended
    },
    setDifficulty: (state: CounterState) => {
      // Updade difficulty
    },
    setCustomWords: (state: CounterState) => {
      // Updade CustomWords
    },
    setUseCustom: (state: CounterState) => {
      // Updade UseCustom
    },
    setLoadThemes: (state: CounterState) => {
      // Updade loadThemes
    },
  },
});

export const { generateNewBoardData, processWord, setDifficulty, setCustomWords, setUseCustom, setLoadThemes } =
  gameSlice.actions;

export default gameSlice.reducer;
