/* eslint-disable no-param-reassign */

import IGameState from '../../types/state';
import SearchWordGameController from '../../utils/SearchWordGameController';
// eslint-disable-next-line import/order
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/order
import defaultInitialState from './initialState';

const SWGC = SearchWordGameController();

const item = window.localStorage.getItem('gameState');
const initialState = item ? JSON.parse(item) : defaultInitialState;

export const gameSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    generateNewBoardData: (state: IGameState) => {
      state.boardData.matchEnded = false;
      state.gameEnded = false;
      state.matchPoints = 0;
      state.boardData = SWGC.getBoardData(state);
    },
    processWord: (state: IGameState, payloadAction: { payload: { word: string; color: string } }) => {
      state = SWGC.processWord(state, payloadAction.payload);
      if (SWGC.matchHasEnded(state)) {
        state.boardData.matchEnded = true;
        if (state.useReverse)
          state.matchPoints = Math.ceil(
            state.matchPoints * state.difficult.parameters[state.difficult.current].reverseWordsExtraPoints
          );
        if (state.hideFeedbacks)
          state.matchPoints = Math.ceil(
            state.matchPoints * state.difficult.parameters[state.difficult.current].hiddenWordsExtraPoints
          );
        state.points += state.matchPoints * state.matches;
        state.matchPoints = 0;
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
    setUseReverse: (state: IGameState, payloadAction: { payload: boolean }) => {
      state.useReverse = payloadAction.payload;
    },
    setLoadThemes: (state: IGameState, payloadAction: { payload: string[] }) => {
      state.loadThemes = payloadAction.payload;
    },
    setNextMatch: (state: IGameState) => {
      state.matches += 1;
    },
    setHiddenWords: (state: IGameState, payloadAction: { payload: boolean }) => {
      state.hideFeedbacks = payloadAction.payload;
    },
    setMatchPoints: (state: IGameState, payloadAction: { payload: number }) => {
      state.matchPoints += payloadAction.payload;
    },
    clearMatchPoints: (state: IGameState) => {
      state.matchPoints = 0;
    },
    resetGame: (state: IGameState) => {
      state.points = 0;
      state.matchPoints = 0;
      state.matches = 1;
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
  setUseReverse,
  setLoadThemes,
  resetGame,
  setNextMatch,
  setHiddenWords,
  setMatchPoints,
  clearMatchPoints,
} = gameSlice.actions;

export default gameSlice.reducer;
