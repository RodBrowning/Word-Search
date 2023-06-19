import IGameState from '../../interfaces/state';
import Themes from './themes/themes';

// eslint-disable-next-line import/order

const initialState: IGameState = {
  context: {
    game: {
      difficulty: {
        parameters: {
          easy: {
            gridShrinkFactor: 0.6,
            wordsGrowthFactor: 0.6,
            wordsLengthFactor: 1.4,
            pointsByFoundWord: 1,
            reverseWordsExtraPoints: 1.1,
            hiddenWordsExtraPoints: 1.2,
          },
          normal: {
            gridShrinkFactor: 0.8,
            wordsGrowthFactor: 0.8,
            wordsLengthFactor: 1.2,
            pointsByFoundWord: 2,
            reverseWordsExtraPoints: 1.2,
            hiddenWordsExtraPoints: 1.3,
          },
          hard: {
            gridShrinkFactor: 1,
            wordsGrowthFactor: 1,
            wordsLengthFactor: 1,
            pointsByFoundWord: 3,
            reverseWordsExtraPoints: 1.3,
            hiddenWordsExtraPoints: 1.4,
          },
        },
      },
      themes: Themes,
      availableSpace: 0,
      matchesLimit: 100,
      hasEnded: false,
    },
    user: {
      currentDifficulty: 'normal',
      points: 0,
      useCustom: false,
      useReverse: false,
      customWords: [],
      loadThemes: ['nomes'],
      hideFeedbacks: false,
      matchPoints: 0,
      matches: 1,
      round: 1,
      boardData: {
        board: [],
        boardSize: {
          columns: 0,
          rows: 0,
        },
        feedbacks: [],
        hasMatchEnded: false,
      },
    },
  },
};

export default initialState;
