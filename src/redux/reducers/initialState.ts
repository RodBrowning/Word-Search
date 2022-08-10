import IGameState from '../../types/state';
// eslint-disable-next-line import/order
import Themes from './themes/themes';

const initialState: IGameState = {
  level: 1,
  points: 1,
  difficult: 'medium',
  useCustom: false,
  customWords: [],
  loadThemes: ['animais'],
  themes: Themes,
  boardData: {
    board: [],
    feedbacks: [],
  },
};

export default initialState;
