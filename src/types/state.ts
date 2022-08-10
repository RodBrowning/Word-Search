import IFeedback from './feedback';
import ITheme from './theme';

export default interface IGameState {
  level: number;
  points: number;
  difficult: string;
  customWords: string[];
  useCustom: boolean;
  loadThemes: string[];
  themes: ITheme | {};
  boardData: {
    board: string[][];
    feedbacks: [IFeedback] | [];
  };
}
