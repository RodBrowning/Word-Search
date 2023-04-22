import IFeedback from './feedback';
import ITheme from './theme';

export default interface IGameState {
  points: number;
  difficulty: {
    current: 'easy' | 'normal' | 'hard';
    parameters: {
      [difficulty: string]: {
        gridShrinkFactor: number;
        wordsGrowthFactor: number;
        wordsLengthFactor: number;
        pointsByFoundWord: number;
        reverseWordsExtraPoints: number;
        hiddenWordsExtraPoints: number;
      };
    };
  };
  customWords: string[];
  useCustom: boolean;
  useReverse: boolean;
  loadThemes: string[];
  themes: ITheme;
  availableSpace: number;
  hideFeedbacks: boolean;
  matchPoints: number;
  matches: number;
  matchesLimit: number;
  round: number;
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
