/* eslint-disable import/order */
import IGameState from '../types/state';
import type { PayloadAction } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
import SearchWordsGame from './SearchWordGame';

interface IPayladAction {
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

    switch (state.difficult) {
      case 'easy':
        boardSize.columns = Math.floor(boardSize.columns * 0.6);
        boardSize.rows = Math.floor(boardSize.rows * 0.6);
        break;
      case 'normal':
        boardSize.columns = Math.floor(boardSize.columns * 0.8);
        boardSize.rows = Math.floor(boardSize.rows * 0.8);
        break;
      case 'hard':
        boardSize.columns = Math.floor(boardSize.columns * 1);
        boardSize.rows = Math.floor(boardSize.rows * 1);
        break;
      default:
        break;
    }

    boardSize.columns =
      boardSize.columns < defaultInicialSize.minColumns ? defaultInicialSize.minColumns : boardSize.columns;
    boardSize.rows = boardSize.rows < defaultInicialSize.minRows ? defaultInicialSize.minRows : boardSize.rows;
    // debugger;
    return boardSize;
  }
  /// set numberOfWords
  function getNumberOfWords(state: IGameState) {}

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
    // debugger;
    const config = {
      boardSize,
      numberOfWords: 5,
      words,
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
    state.boardData.feedbacks.map((feedback: IPayladAction) => {
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
