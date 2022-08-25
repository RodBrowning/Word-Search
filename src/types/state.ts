import IFeedback from './feedback';
import ITheme from './theme';

export default interface IGameState {
  points: number;
  difficult: 'easy' | 'normal' | 'hard';
  customWords: string[];
  useCustom: boolean;
  loadThemes: string[];
  themes: ITheme;
  availableSpace: number;
  matches: number;
  matchesLimit: number;
  gameEnded: boolean;
  boardData: {
    board: string[][];
    boardSize: {
      columns: number;
      rows: number;
    };
    feedbacks: IFeedback[] | [];
    matchEnded: boolean;
  };
}
