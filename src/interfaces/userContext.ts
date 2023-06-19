import IFeedback from './feedback';

export default interface IUserContext {
  currentDifficulty: 'easy' | 'normal' | 'hard';
  points: number;
  customWords: string[];
  useCustom: boolean;
  useReverse: boolean;
  loadThemes: string[];
  hideFeedbacks: boolean;
  matchPoints: number;
  matches: number;
  round: number;
  boardData: {
    board: string[][];
    boardSize: {
      columns: number;
      rows: number;
    };
    feedbacks: IFeedback[] | [];
    hasMatchEnded: boolean;
  };
}
