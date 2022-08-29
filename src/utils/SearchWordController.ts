/* eslint-disable import/order */
import IGameState from '../types/state';
import type { PayloadAction } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
import SearchWordsGame from './SearchWordGame';

interface IPayloadAction {
  word: any;
  found: boolean;
}

function SearchWordController() {
  function getBoardSize(state: IGameState) {
    const maxColumnWidth = 24;
    const maxColumnNumber = Math.floor(state.availableSpace / maxColumnWidth);
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
      boardSize.columns * state.difficult.parameters[state.difficult.current].gridShrinkFactor
    );
    boardSize.rows = Math.floor(boardSize.rows * state.difficult.parameters[state.difficult.current].gridShrinkFactor);

    boardSize.columns =
      boardSize.columns < defaultInicialSize.minColumns ? defaultInicialSize.minColumns : boardSize.columns;
    boardSize.rows = boardSize.rows < defaultInicialSize.minRows ? defaultInicialSize.minRows : boardSize.rows;

    return boardSize;
  }

  function getNumberOfWords(state: IGameState) {
    const inicialWordNumber = 5;
    const maxWordsNumber = 20;
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
      finalNumberOfWords * state.difficult.parameters[state.difficult.current].wordsGrowthFactor
    );

    return finalNumberOfWords;
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

    minWordLength = Math.ceil(minWordLength * state.difficult.parameters[state.difficult.current].wordsLengthFactor);
    currentMaxWordLength = Math.ceil(
      currentMaxWordLength * state.difficult.parameters[state.difficult.current].wordsLengthFactor
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

    const config = {
      boardSize,
      numberOfWords,
      words: filteredWords,
      useCustom: state.useCustom,
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

  function processWord(state: IGameState, payloadAction: PayloadAction) {
    // eslint-disable-next-line array-callback-return
    state.boardData.feedbacks.map((feedback: IPayloadAction) => {
      if (feedback.word === payloadAction.payload) {
        feedback.found = true;
        // processPoints
      }
    });

    return state;
  }

  function gameHasEnded(state: IGameState) {
    return state.boardData.feedbacks.every((feedback) => {
      return feedback.found === true;
    });
  }

  return {
    getBoardData,
    processWord,
    gameHasEnded,
  };
}
export default SearchWordController;
