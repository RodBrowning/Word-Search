import IGameState from '../../types/state';
// eslint-disable-next-line import/order
import Themes from './themes/themes';

const initialState: IGameState = {
  points: 9,
  difficult: {
    current: 'hard',
    parameters: {
      ease: {
        gridShrinkFactor: 0.6,
        wordsGrowthFactor: 1.4,
        wordsLengthFactor: 1.4,
      },
      normal: {
        gridShrinkFactor: 0.8,
        wordsGrowthFactor: 1.2,
        wordsLengthFactor: 1.2,
      },
      hard: {
        gridShrinkFactor: 1,
        wordsGrowthFactor: 1,
        wordsLengthFactor: 1,
      },
    },
  },
  useCustom: false,
  customWords: [],
  loadThemes: ['animais'],
  themes: Themes,
  availableSpace: 0,
  matches: 50,
  matchesLimit: 50,
  gameEnded: false,
  boardData: {
    board: [],
    boardSize: {
      columns: 0,
      rows: 0,
    },
    feedbacks: [],
    matchEnded: false,
  },
};

export default initialState;
