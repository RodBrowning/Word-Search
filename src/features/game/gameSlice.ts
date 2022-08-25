/* eslint-disable import/order */
/* eslint-disable no-param-reassign */
import IGameState from '../../types/state';
import type { PayloadAction } from '@reduxjs/toolkit';
import SearchWordController from '../../utils/SearchWordController';
import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';

const SWC = SearchWordController();

export const gameSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    generateNewBoardData: (state: IGameState) => {
      state.boardData.matchEnded = false;
      state.gameEnded = false;
      state.boardData = SWC.getBoardData(state);
    },
    processWord: (state: IGameState, payloadAction: PayloadAction) => {
      // eslint-disable-next-line array-callback-return
      state = SWC.processWord(state, payloadAction);
      if (SWC.gameHasEnded(state)) {
        state.boardData.matchEnded = true;
        state.matches += 1;
      }
      if (state.matches > state.matchesLimit) {
        state.gameEnded = true;
      }

      //
    },
    setAvailableSpace: (state: IGameState, payloadAction: { payload: number }) => {
      state.availableSpace = payloadAction.payload;
    },
    setDifficulty: (state: IGameState) => {
      // Updade difficulty
    },
    setCustomWords: (state: IGameState) => {
      // Updade CustomWords
    },
    setUseCustom: (state: IGameState) => {
      // Updade UseCustom
    },
    setLoadThemes: (state: IGameState) => {
      // Updade loadThemes
    },
  },
});

export const {
  generateNewBoardData,
  processWord,
  setAvailableSpace,
  setDifficulty,
  setCustomWords,
  setUseCustom,
  setLoadThemes,
} = gameSlice.actions;

export default gameSlice.reducer;
