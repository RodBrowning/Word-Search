/* eslint-disable no-param-reassign */

import IGameState from '../../interfaces/state';
import SearchWordGameController from '../../utils/SearchWordGameController';
// eslint-disable-next-line import/order
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/order
import defaultInitialState from './initialState';
import { getInitialGameState } from '../utils';

const SWGC = SearchWordGameController();

const initialState = getInitialGameState(defaultInitialState);

export const gameSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    generateNewBoardData: (state: IGameState) => {
      state.context.user.boardData.hasMatchEnded = false;
      state.context.game.hasEnded = false;
      state.context.user.matchPoints = 0;
      state.context.user.boardData = SWGC.getBoardData(state);
    },
    processWord: (state: IGameState, payloadAction: { payload: { word: string; color: string } }) => {
      state = SWGC.processWord(state, payloadAction.payload);
      if (SWGC.matchHasEnded(state)) {
        state = SWGC.processEndedMatch(state);
      }
      if (SWGC.gameHasEnded(state)) {
        state.context.game.hasEnded = true;
        state.context.user.round += 1;
        state.context.user.matches = 0;
      }
    },
    setAvailableSpace: (state: IGameState, payloadAction: { payload: number }) => {
      state.context.game.availableSpace = payloadAction.payload;
    },
    setDifficulty: (state: IGameState, payloadAction: { payload: 'easy' | 'normal' | 'hard' }) => {
      state.context.user.currentDifficulty = payloadAction.payload;
    },
    setCustomWords: (state: IGameState, payloadAction: { payload: string[] }) => {
      state.context.user.customWords = payloadAction.payload;
    },
    setUseCustom: (state: IGameState, payloadAction: { payload: boolean }) => {
      state.context.user.useCustom = payloadAction.payload;
    },
    setUseReverse: (state: IGameState, payloadAction: { payload: boolean }) => {
      state.context.user.useReverse = payloadAction.payload;
    },
    setLoadThemes: (state: IGameState, payloadAction: { payload: string[] }) => {
      state.context.user.loadThemes = payloadAction.payload;
    },
    setNextMatch: (state: IGameState) => {
      state.context.user.matches += 1;
    },
    setHiddenWords: (state: IGameState, payloadAction: { payload: boolean }) => {
      state.context.user.hideFeedbacks = payloadAction.payload;
    },
    setMatchPoints: (state: IGameState, payloadAction: { payload: number }) => {
      state.context.user.matchPoints += payloadAction.payload;
    },
    clearMatchPoints: (state: IGameState) => {
      state.context.user.matchPoints = 0;
    },
    resetGame: (state: IGameState) => {
      state.context.user.points = 0;
      state.context.user.matchPoints = 0;
      state.context.user.matches = 1;
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
