/* eslint-disable no-param-reassign */

import IFeedback from '../types/feedback';
import IGameState from '../types/state';
// eslint-disable-next-line import/order
import SearchWordsGame from './SearchWordGame';

function SearchWordGameController() {
  function getBoardSize(state: IGameState) {
    const minColumnWidth = 25;
    const tableBorder = 14;
    const maxAvailableColumnNumber = Math.floor((state.availableSpace - tableBorder) / minColumnWidth);
    const maxColumnNumber = maxAvailableColumnNumber > 37 ? 37 : maxAvailableColumnNumber;
    const maxRowNumber = 30;
    const { matchesLimit } = state;
    const defaultInicialSize = {
      rows: 15,
      minRows: 8,
      columns: 15,
      minColumns: 8,
    };

    const availableColumns = maxColumnNumber - defaultInicialSize.columns;
    const columnsToAdd = Math.floor((state.matches - 1) / (matchesLimit / availableColumns));
    const availableRows = maxRowNumber - defaultInicialSize.rows;
    const rowsToAdd = Math.floor((state.matches - 1) / (matchesLimit / availableRows));

    const boardSize = {
      rows: 0,
      columns: 0,
    };
    boardSize.columns = defaultInicialSize.columns + columnsToAdd;
    boardSize.rows = defaultInicialSize.rows + rowsToAdd;

    boardSize.columns = Math.floor(
      boardSize.columns * state.difficulty.parameters[state.difficulty.current].gridShrinkFactor
    );
    boardSize.rows = Math.floor(
      boardSize.rows * state.difficulty.parameters[state.difficulty.current].gridShrinkFactor
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
    const reductionPoint = Math.floor(state.matchesLimit * 0.8);
    const lastMatches = state.matchesLimit - reductionPoint;

    let numberOfWordsToAdd = Math.floor(state.matches / (reductionPoint / wordsToPlace) + inicialWordNumber);
    numberOfWordsToAdd = numberOfWordsToAdd > maxWordsNumber ? maxWordsNumber : numberOfWordsToAdd;

    // remove words after reductionPoint, in this case 80% of the total game matches.
    const matchesAfterReductionPoint = lastMatches - (state.matchesLimit - state.matches);
    const matchesToRemoveOneWord = lastMatches / (wordsToPlace + inicialWordNumber);

    let numberOfWordsToRemove = matchesAfterReductionPoint / matchesToRemoveOneWord;
    numberOfWordsToRemove = numberOfWordsToRemove < 0 ? 0 : numberOfWordsToRemove;

    let finalNumberOfWords = numberOfWordsToAdd - numberOfWordsToRemove;
    finalNumberOfWords = finalNumberOfWords < 1 ? 1 : finalNumberOfWords;

    finalNumberOfWords = Math.ceil(
      finalNumberOfWords * state.difficulty.parameters[state.difficulty.current].wordsGrowthFactor
    );

    return finalNumberOfWords;
  }

  function getNumberOfReverseWords(state: IGameState, numberOfWords: number) {
    const percentageOfGameProgress = Math.round((state.matches * 100) / state.matchesLimit);
    return Math.round((percentageOfGameProgress / 100) * numberOfWords);
  }

  function getWordsByLength(state: IGameState, words: string[]) {
    const reductionPoint = Math.floor(state.matchesLimit * 0.8);
    const lastMatches = state.matchesLimit - reductionPoint;
    const matchesAfterReductionPoint = lastMatches - (state.matchesLimit - state.matches);

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

    minWordLength = Math.ceil(minWordLength * state.difficulty.parameters[state.difficulty.current].wordsLengthFactor);
    currentMaxWordLength = Math.ceil(
      currentMaxWordLength * state.difficulty.parameters[state.difficulty.current].wordsLengthFactor
    );

    if (state.matches > reductionPoint) {
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
    state.loadThemes.forEach((loadTheme) => {
      // eslint-disable-next-line no-prototype-builtins
      if (state.themes.hasOwnProperty(loadTheme)) {
        words.push(...state.themes[loadTheme]);
      }
    });
    const boardSize = getBoardSize(state);
    const numberOfWords = getNumberOfWords(state);
    const filteredWords = getWordsByLength(state, words);
    let numberOfReverseWords = 0;
    if (state.useReverse) {
      numberOfReverseWords = getNumberOfReverseWords(state, numberOfWords) || 1;
    }

    const config = {
      boardSize,
      numberOfWords,
      numberOfReverseWords,
      words: filteredWords,
      useCustom: state.useCustom,
      useReverse: state.useReverse,
      customWords: state.customWords,
    };
    state.boardData.board = searchWordsGame.getBoard(config);
    state.boardData.feedbacks = searchWordsGame.getFeedbacks();
    state.boardData.boardSize = {
      rows: config.boardSize.rows,
      columns: config.boardSize.columns,
    };
    return state.boardData;
  }

  function processWord(state: IGameState, payload: { word: string; color: string }) {
    // eslint-disable-next-line array-callback-return
    state.boardData.feedbacks.map((feedback: IFeedback) => {
      if (feedback.word === payload.word) {
        feedback.found = true;
        feedback.color = payload.color;
        state.matchPoints += state.difficulty.parameters[state.difficulty.current].pointsByFoundWord;
      }
    });

    return state;
  }

  function processEndedMatch(state: IGameState) {
    state.boardData.matchEnded = true;
    if (state.useReverse)
      state.matchPoints = Math.ceil(
        state.matchPoints * state.difficulty.parameters[state.difficulty.current].reverseWordsExtraPoints
      );
    if (state.hideFeedbacks)
      state.matchPoints = Math.ceil(
        state.matchPoints * state.difficulty.parameters[state.difficulty.current].hiddenWordsExtraPoints
      );

    const smallBoard = state.boardData.boardSize.columns <= 15;
    if (smallBoard) state.matchPoints *= 1;

    const mediumBoard = state.boardData.boardSize.columns >= 16 && state.boardData.boardSize.columns <= 28;
    if (mediumBoard) state.matchPoints *= 1.1;

    const largerBoard = state.boardData.boardSize.columns >= 29;
    if (largerBoard) state.matchPoints *= 1.2;

    state.points += Math.round(state.matchPoints * state.matches);
    state.matchPoints = 0;
    return state;
  }

  function matchHasEnded(state: IGameState) {
    return state.boardData.feedbacks.every((feedback) => {
      return feedback.found === true;
    });
  }

  function gameHasEnded(state: IGameState) {
    return state.matches > state.matchesLimit;
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
