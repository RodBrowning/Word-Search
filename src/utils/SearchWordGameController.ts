/* eslint-disable no-param-reassign */

import IFeedback from '../interfaces/feedback';
import IGameState from '../interfaces/state';
// eslint-disable-next-line import/order
import SearchWordsGame from './SearchWordGame';

function SearchWordGameController() {
  function getBoardSize(state: IGameState) {
    const minColumnWidth = 25;
    const tableBorder = 14;
    const maxAvailableColumnNumber = Math.floor((state.context.game.availableSpace - tableBorder) / minColumnWidth);
    const maxColumnNumber = maxAvailableColumnNumber > 37 ? 37 : maxAvailableColumnNumber;
    const maxRowNumber = 30;
    const { matchesLimit } = state.context.game;
    const defaultInicialSize = {
      rows: 15,
      minRows: 8,
      columns: 15,
      minColumns: 8,
    };

    const availableColumns = maxColumnNumber - defaultInicialSize.columns;
    const columnsToAdd =
      availableColumns < 0
        ? availableColumns
        : Math.floor((state.context.user.matches - 1) / (matchesLimit / availableColumns));
    const availableRows = maxRowNumber - defaultInicialSize.rows;
    const rowsToAdd = Math.floor((state.context.user.matches - 1) / (matchesLimit / availableRows));

    const boardSize = {
      rows: 0,
      columns: 0,
    };
    boardSize.columns = defaultInicialSize.columns + columnsToAdd;
    boardSize.rows = defaultInicialSize.rows + rowsToAdd;

    boardSize.columns = Math.floor(
      boardSize.columns *
        state.context.game.difficulty.parameters[state.context.user.currentDifficulty].gridShrinkFactor
    );
    boardSize.rows = Math.floor(
      boardSize.rows * state.context.game.difficulty.parameters[state.context.user.currentDifficulty].gridShrinkFactor
    );

    boardSize.columns =
      boardSize.columns < defaultInicialSize.minColumns ? defaultInicialSize.minColumns : boardSize.columns;
    boardSize.rows = boardSize.rows < defaultInicialSize.minRows ? defaultInicialSize.minRows : boardSize.rows;

    return boardSize;
  }

  function getNumberOfWords(state: IGameState) {
    const inicialWordNumber = 5;
    const maxWordsNumber = 30;
    const wordsToPlace = maxWordsNumber - inicialWordNumber;
    const reductionPoint = Math.floor(state.context.game.matchesLimit * 0.8);
    const lastMatches = state.context.game.matchesLimit - reductionPoint;

    let numberOfWordsToAdd = Math.floor(
      state.context.user.matches / (reductionPoint / wordsToPlace) + inicialWordNumber
    );
    numberOfWordsToAdd = numberOfWordsToAdd > maxWordsNumber ? maxWordsNumber : numberOfWordsToAdd;

    // remove words after reductionPoint, in this case 80% of the total game matches.
    const matchesAfterReductionPoint = lastMatches - (state.context.game.matchesLimit - state.context.user.matches);
    const matchesToRemoveOneWord = lastMatches / (wordsToPlace + inicialWordNumber);

    let numberOfWordsToRemove = matchesAfterReductionPoint / matchesToRemoveOneWord;
    numberOfWordsToRemove = numberOfWordsToRemove < 0 ? 0 : numberOfWordsToRemove;

    let finalNumberOfWords = numberOfWordsToAdd - numberOfWordsToRemove;
    finalNumberOfWords = finalNumberOfWords < 1 ? 1 : finalNumberOfWords;

    finalNumberOfWords = Math.ceil(
      finalNumberOfWords *
        state.context.game.difficulty.parameters[state.context.user.currentDifficulty].wordsGrowthFactor
    );

    return finalNumberOfWords;
  }

  function getNumberOfReverseWords(state: IGameState, numberOfWords: number) {
    const percentageOfGameProgress = Math.round((state.context.user.matches * 100) / state.context.game.matchesLimit);
    return Math.round((percentageOfGameProgress / 100) * numberOfWords);
  }

  function getWordsByLength(state: IGameState, words: string[]) {
    const reductionPoint = Math.floor(state.context.game.matchesLimit * 0.8);
    const lastMatches = state.context.game.matchesLimit - reductionPoint;
    const matchesAfterReductionPoint = lastMatches - (state.context.game.matchesLimit - state.context.user.matches);

    const longestWord = words.reduce((longestString, word) => {
      if (word.length > longestString) {
        longestString = word.length;
      }
      return longestString;
    }, 0);
    const shortestWord = words.reduce((shortestWord, word) => {
      if (shortestWord === 0 || word.length < shortestWord) {
        shortestWord = word.length;
      }
      return shortestWord;
    }, 0);

    const maxWordLength = longestWord < 10 ? longestWord : 10;
    let minWordLength = shortestWord < 4 ? 4 : shortestWord;
    const lettersToReduceByMatch = (maxWordLength - minWordLength) / lastMatches;
    let lettersToReduce = Math.floor(lettersToReduceByMatch * matchesAfterReductionPoint);
    lettersToReduce = lettersToReduce < 0 ? 0 : lettersToReduce;

    let currentMaxWordLength = maxWordLength - lettersToReduce;

    minWordLength = Math.ceil(
      minWordLength * state.context.game.difficulty.parameters[state.context.user.currentDifficulty].wordsLengthFactor
    );
    currentMaxWordLength = Math.ceil(
      currentMaxWordLength *
        state.context.game.difficulty.parameters[state.context.user.currentDifficulty].wordsLengthFactor
    );

    if (state.context.user.matches > reductionPoint) {
      // eslint-disable-next-line array-callback-return, consistent-return
      words = words.filter((word) => {
        if (word.length <= currentMaxWordLength && word.length >= minWordLength) {
          return word;
        }
      });
    }
    return words;
  }

  function getBoardData(state: IGameState) {
    const searchWordsGame = SearchWordsGame();
    const words: string[] = [];
    // eslint-disable-next-line array-callback-return
    state.context.user.loadThemes.forEach((loadTheme) => {
      // eslint-disable-next-line no-prototype-builtins
      if (state.context.game.themes.hasOwnProperty(loadTheme)) {
        words.push(...state.context.game.themes[loadTheme]);
      }
    });
    const boardSize = getBoardSize(state);
    const numberOfWords = getNumberOfWords(state);
    const filteredWords = getWordsByLength(state, words);
    let numberOfReverseWords = 0;
    if (state.context.user.useReverse) {
      numberOfReverseWords = getNumberOfReverseWords(state, numberOfWords) || 1;
    }

    const config = {
      boardSize,
      numberOfWords,
      numberOfReverseWords,
      words: filteredWords,
      useCustom: state.context.user.useCustom,
      useReverse: state.context.user.useReverse,
      customWords: state.context.user.customWords,
    };
    state.context.user.boardData.board = searchWordsGame.getBoard(config);
    state.context.user.boardData.feedbacks = searchWordsGame.getFeedbacks();
    state.context.user.boardData.boardSize = {
      rows: config.boardSize.rows,
      columns: config.boardSize.columns,
    };
    return state.context.user.boardData;
  }

  function processWord(state: IGameState, payload: { word: string; color: string }) {
    // eslint-disable-next-line array-callback-return
    state.context.user.boardData.feedbacks.map((feedback: IFeedback) => {
      if (feedback.word === payload.word) {
        feedback.found = true;
        feedback.color = payload.color;
        state.context.user.matchPoints +=
          state.context.game.difficulty.parameters[state.context.user.currentDifficulty].pointsByFoundWord;
      }
    });

    return state;
  }

  function processEndedMatch(state: IGameState) {
    state.context.user.boardData.hasMatchEnded = true;
    if (state.context.user.useReverse)
      state.context.user.matchPoints = Math.ceil(
        state.context.user.matchPoints *
          state.context.game.difficulty.parameters[state.context.user.currentDifficulty].reverseWordsExtraPoints
      );
    if (state.context.user.hideFeedbacks)
      state.context.user.matchPoints = Math.ceil(
        state.context.user.matchPoints *
          state.context.game.difficulty.parameters[state.context.user.currentDifficulty].hiddenWordsExtraPoints
      );

    const smallBoard = state.context.user.boardData.boardSize.columns <= 15;
    if (smallBoard) state.context.user.matchPoints *= 1;

    const mediumBoard =
      state.context.user.boardData.boardSize.columns >= 16 && state.context.user.boardData.boardSize.columns <= 28;
    if (mediumBoard) state.context.user.matchPoints *= 1.1;

    const largerBoard = state.context.user.boardData.boardSize.columns >= 29;
    if (largerBoard) state.context.user.matchPoints *= 1.2;

    state.context.user.points += Math.round(
      state.context.user.matchPoints * (state.context.user.matches % state.context.game.matchesLimit)
    );
    state.context.user.matchPoints = 0;
    return state;
  }

  function matchHasEnded(state: IGameState) {
    return state.context.user.boardData.feedbacks.every((feedback) => {
      return feedback.found === true;
    });
  }

  function gameHasEnded(state: IGameState) {
    return state.context.user.matches === state.context.game.matchesLimit;
  }

  return {
    getBoardData,
    processWord,
    processEndedMatch,
    matchHasEnded,
    gameHasEnded,
  };
}
export default SearchWordGameController;
