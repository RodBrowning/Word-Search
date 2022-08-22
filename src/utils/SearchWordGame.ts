/* eslint-disable no-param-reassign */
import IConfig from './configInterface';
import IFeedback from '../types/feedback';

function SearchWordsGame() {
  const directions = ['horizontal', 'vertical', 'crossedUp', 'crossedDown'];
  let config: IConfig = {
    boardSize: { column: 15, row: 15 },
    numberOfWords: undefined,
    words: [
      'um',
      'dois',
      'tres',
      'quatro',
      'cinco',
      'seis',
      'sete',
      'oito',
      'nove',
      'dez',
      'onze',
      'doze',
      'treze',
      'quatorze',
      'quinze',
      'dezesseis',
      'dezessete',
      'dezoito',
      'dezenove',
      'vinte',
      'trinta',
      'quarenta',
      'cinquenta',
      'sessenta',
      'oitenta',
      'cem',
      'mil',
      'milhao',
      'bilhao',
    ],
    customWords: [],
    useCustom: false,
  };
  let feedbacks: IFeedback[] = [];

  function getEmptyBoard(): string[][] {
    const board = [];
    const { row, column } = config.boardSize!;
    for (let i = 0; i < row; i++) {
      board.push(new Array(column));
    }
    return board;
  }

  function getInitialPosition(
    boardSize: { column: number; row: number },
    word: string,
    direction: string
  ): { row: number; column: number } {
    let column = 0;
    let row = 0;
    const wordLength = word.length;
    const availableSpaceX = boardSize.column - wordLength;
    const availableSpaceY = boardSize.row - wordLength;

    switch (direction) {
      case 'horizontal':
        column = Math.round(Math.random() * availableSpaceX);
        row = Math.round(Math.random() * (boardSize.row - 1));
        break;
      case 'vertical':
        column = Math.round(Math.random() * (boardSize.column - 1));
        row = Math.round(Math.random() * availableSpaceY);
        break;
      case 'crossedUp':
        column = Math.round(Math.random() * availableSpaceX);
        row = Math.round(Math.random() * availableSpaceY) + (wordLength - 1);
        break;
      case 'crossedDown':
        column = Math.round(Math.random() * availableSpaceX);
        row = Math.round(Math.random() * availableSpaceY);
        break;
      default:
        break;
    }
    return {
      column,
      row,
    };
  }

  function getNextLetterPosition(
    position: { row: number; column: number },
    direction: string
  ): { row: number; column: number } {
    switch (direction) {
      case 'horizontal':
        position.column += 1;
        break;
      case 'vertical':
        position.row += 1;
        break;
      case 'crossedUp':
        position.column += 1;
        position.row -= 1;
        break;
      case 'crossedDown':
        position.column += 1;
        position.row += 1;
        break;
      default:
        break;
    }
    return position;
  }

  function isPossibleToPlaceWord(
    board: string[][],
    position: { row: number; column: number },
    direction: string,
    word: string,
    index: number = 0
  ): boolean {
    if (index >= word.length) return true;
    if (board.length - 1 < position.row || position.row < 0) return false;
    if (board[0].length - 1 < position.column || position.column < 0) return false;

    const cell = board[position.row][position.column];

    if ((position && cell === undefined) || cell === word[index]) {
      position = getNextLetterPosition(position, direction);
      return isPossibleToPlaceWord(board, position, direction, word, index + 1);
    }
    return false;
  }

  function placeWordInBoard(
    board: string[][],
    position: { row: number; column: number },
    direction: string,
    word: string,
    index: number = 0
  ): string[][] {
    if (index === word.length) return board;
    board[position.row][position.column] = word[index];
    position = getNextLetterPosition(position, direction);
    return placeWordInBoard(board, position, direction, word, index + 1);
  }

  function getLastLetterPosition(
    initPos: { row: number; column: number },
    direction: string,
    word: string
  ): { row: number; column: number } {
    let column = 0;
    let row = 0;

    switch (direction) {
      case 'horizontal':
        column = initPos.column + (word.length - 1);
        row = initPos.row;
        break;
      case 'vertical':
        column = initPos.column;
        row = initPos.row + (word.length - 1);
        break;
      case 'crossedDown':
        column = initPos.column + (word.length - 1);
        row = initPos.row + (word.length - 1);
        break;
      case 'crossedUp':
        column = initPos.column + (word.length - 1);
        row = initPos.row + (word.length - 1);
        break;
      default:
        break;
    }
    return { column, row };
  }

  function setFeedback(initPos: { row: number; column: number }, direction: string, word: string) {
    const lastLetterPosition = getLastLetterPosition(initPos, direction, word);
    feedbacks.push({
      word,
      found: false,
      position: {
        initial: {
          row: initPos.row,
          column: initPos.column,
        },
        final: {
          row: lastLetterPosition.row,
          column: lastLetterPosition.column,
        },
      },
    });
  }

  function shuffleWords(words: string[]): string[] {
    return words.sort(() => {
      return Math.round(Math.random() * Math.floor(3)) - 1;
    });
  }

  function fillEmptyCells(board: string[][]): string[][] {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (!board[i][j]) {
          const letter = String.fromCharCode(Math.random() * (122 - 97) + 97).toUpperCase();
          board[i][j] = letter;
        }
      }
    }
    return board;
  }

  function setConfig(pConfig?: IConfig): IConfig {
    config = { ...config, ...pConfig };
    return config;
  }

  function populateBoard(pConfig?: IConfig): string[][] {
    const config = setConfig(pConfig);
    if ((config?.words!.length <= 0 && config.useCustom === false) || config.numberOfWords! <= 0) {
      throw new Error('Any word to find');
    }

    let board = getEmptyBoard();
    let wordsArray;
    if (config.customWords!.length > 0 && config.useCustom) {
      wordsArray = [...config.words!, ...config.customWords!];
    } else {
      wordsArray = config.words!;
    }
    const words = shuffleWords(wordsArray);
    feedbacks = [];
    let placedWords = 0;

    for (let i = 0; i < words.length; i++) {
      let isPosToPlace = false;
      const word = words[i].toUpperCase();
      const maxTries = 100;

      let tries = 0;
      while (!isPosToPlace && tries <= maxTries) {
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const initPos = getInitialPosition(config.boardSize!, word, direction);

        isPosToPlace = isPossibleToPlaceWord(board, { ...initPos }, direction, word);
        if (isPosToPlace) {
          board = placeWordInBoard(board, { ...initPos }, direction, word);
          setFeedback(initPos, direction, word);
          placedWords += 1;
        }
        tries += 1;
      }
      if (placedWords >= config.numberOfWords!) break;
    }

    board = fillEmptyCells(board);
    return board;
  }

  function getFeedbacks(): IFeedback[] {
    return feedbacks;
  }

  function getBoardSize(): { column: number; row: number } {
    return config.boardSize!;
  }

  return {
    getBoard: populateBoard,
    getFeedbacks,
    getBoardSize,
  };
}

export default SearchWordsGame;
