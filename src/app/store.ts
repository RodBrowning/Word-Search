import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../features/game/gameSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
