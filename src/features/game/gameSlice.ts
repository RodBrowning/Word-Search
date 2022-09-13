/* eslint-disable import/order */
/* eslint-disable no-param-reassign */
import IGameState from '../../types/state';
import type { PayloadAction } from '@reduxjs/toolkit';
import SearchWordGameController from '../../utils/SearchWordGameController';
import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';

const SWGC = SearchWordGameController();

export const gameSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    generateNewBoardData: (state: IGameState) => {
      state.boardData.matchEnded = false;
      state.gameEnded = false;
      state.boardData = SWGC.getBoardData(state);
    },
    processWord: (state: IGameState, payloadAction: PayloadAction) => {
      // eslint-disable-next-line array-callback-return
      state = SWGC.processWord(state, payloadAction);
      if (SWGC.matchHasEnded(state)) {
        state.boardData.matchEnded = true;
        state.matches += 1;
        state.points += state.matchPoints;
      }
      if (SWGC.gameHasEnded(state)) {
        state.gameEnded = true;
      }
    },
    setAvailableSpace: (state: IGameState, payloadAction: { payload: number }) => {
      state.availableSpace = payloadAction.payload;
    },
    setDifficulty: (state: IGameState, payloadAction: { payload: 'easy' | 'normal' | 'hard' }) => {
      state.difficult.current = payloadAction.payload;
    },
    setCustomWords: (state: IGameState, payloadAction: { payload: string[] }) => {
      state.customWords = payloadAction.payload;
    },
    setUseCustom: (state: IGameState, payloadAction: { payload: boolean }) => {
      state.useCustom = payloadAction.payload;
    },
    setLoadThemes: (state: IGameState, payloadAction: { payload: string[] }) => {
      state.loadThemes = payloadAction.payload;
    },
    setMatchPoints: (state: IGameState, payloadAction: { payload: number }) => {
      state.matchPoints += payloadAction.payload;
    },
    clearMatchPoints: (state: IGameState) => {
      state.matchPoints = 0;
    },
    resetGame: (state: IGameState) => {
      state.points = 0;
      state.matches = 0;
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
  resetGame,
  setMatchPoints,
  clearMatchPoints,
} = gameSlice.actions;

export default gameSlice.reducer;
