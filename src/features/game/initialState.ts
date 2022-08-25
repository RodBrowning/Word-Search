import IGameState from '../../types/state';
// eslint-disable-next-line import/order
import Themes from './themes/themes';

const initialState: IGameState = {
  points: 9,
  difficult: 'normal',
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
