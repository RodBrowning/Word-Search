/* eslint-disable no-param-reassign */
import IConfig from '../interfaces/configInterface';
import IFeedback from '../interfaces/feedback';

function SearchWordsGame() {
  const directions = ['horizontal', 'vertical', 'crossedUp', 'crossedDown'];
  let defaultConfiguration: IConfig = {
    boardSize: { columns: 15, rows: 15 },
    numberOfWords: 5,
    numberOfReverseWords: 1,
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
    useReverse: false,
  };
  let feedbacks: IFeedback[] = [];
  let feedbackBoard: string[][] = [];

  function getEmptyBoard(pConfig: IConfig): string[][] {
    const board = [];
    const { rows, columns } = pConfig.boardSize!;
    for (let i = 0; i < rows; i++) {
      board.push(new Array(columns));
    }
    return board;
  }

  function getInitialPosition(
    boardSize: { columns: number; rows: number },
    word: string,
    direction: string
  ): { row: number; column: number } {
    let column = 0;
    let row = 0;
    const wordLength = word.length;
    const availableSpaceX = boardSize.columns - wordLength;
    const availableSpaceY = boardSize.rows - wordLength;

    switch (direction) {
      case 'horizontal':
        column = Math.round(Math.random() * availableSpaceX);
        row = Math.round(Math.random() * (boardSize.rows - 1));
        break;
      case 'vertical':
        column = Math.round(Math.random() * (boardSize.columns - 1));
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
    index = 0
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
    index = 0
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
        row = initPos.row - (word.length - 1);
        break;
      default:
        break;
    }
    return { column, row };
  }

  function setFeedback(
    initPos: { row: number; column: number },
    lastLetterPosition: { row: number; column: number },
    word: string
  ) {
    feedbacks.push({
      word: word.charAt(0) + word.slice(1).toLowerCase(),
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
    const shuffled = words
      .map((value) => {
        return { value, sort: Math.random() };
      })
      .sort((a, b) => {
        return a.sort - b.sort;
      })
      .map(({ value }) => {
        return value;
      });

    return shuffled;
  }

  function calculateChanceToBeReversed(remainingWordsToPlace: number, remainingReverseWordsToPlace: number): number {
    return Math.round((remainingReverseWordsToPlace * 100) / remainingWordsToPlace);
  }

  function fillEmptyCells(board: string[][]): string[][] {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (!board[i][j]) {
          const letter = String.fromCharCode(Math.round(Math.random() * 25) + 65);
          board[i][j] = letter;
        }
      }
    }
    return board;
  }

  function fillFeedbackBoardEmptyCells(board: string[][]): string[][] {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (!board[i][j]) {
          const char = String.fromCharCode(0xa0);
          board[i][j] = char;
        }
      }
    }
    return board;
  }

  function setConfigUnicWords(pConfig: IConfig): IConfig {
    let wordsSet;
    if (pConfig.customWords!.length > 0 && pConfig.useCustom) {
      wordsSet = new Set([...pConfig.words!, ...pConfig.customWords!]);
    } else {
      wordsSet = new Set(pConfig.words);
    }
    const words = [...wordsSet];
    return { ...pConfig, words };
  }

  function populateBoard(pConfig?: IConfig): string[][] {
    const config = setConfigUnicWords({ ...defaultConfiguration, ...pConfig });
    defaultConfiguration = config;
    if ((config.words!.length <= 0 && config.useCustom === false) || config.numberOfWords! <= 0) {
      throw new Error('Any word to find');
    }

    let board = getEmptyBoard(config);

    const words = shuffleWords(config.words!);
    feedbacks = [];
    let placedWords = 0;
    let placedReverseWords = 0;

    for (let i = 0; i < words.length; i++) {
      let isPosToPlace = false;
      const word = words[i].toUpperCase();
      let maxTries = 100;

      if (config.useReverse) {
        maxTries = 200;
      }
      const remainingWordsToPlace = config.numberOfWords! - placedWords;
      const remainingReverseWordsToPlace = config.numberOfReverseWords! - placedReverseWords;
      const chanceToBeReversed = calculateChanceToBeReversed(remainingWordsToPlace, remainingReverseWordsToPlace);

      let tries = 0;
      while (!isPosToPlace && tries <= maxTries) {
        const direction = directions[Math.floor(Math.random() * directions.length)];
        let currentWord = word.replaceAll(' ', '');

        const isReverse = Math.floor(Math.random() * 101) <= chanceToBeReversed;
        if (config.useReverse && isReverse) currentWord = currentWord.split('').reverse().join('');
        const initPos = getInitialPosition(config.boardSize!, currentWord, direction);

        isPosToPlace = isPossibleToPlaceWord(board, { ...initPos }, direction, currentWord);
        if (isPosToPlace) {
          board = placeWordInBoard(board, { ...initPos }, direction, currentWord);
          if (config.useReverse && isReverse) {
            currentWord = currentWord.split('').reverse().join('');
            placedReverseWords += 1;
          }
          const lastPos = getLastLetterPosition(initPos, direction, currentWord);
          setFeedback(initPos, lastPos, word);
          placedWords += 1;
        }
        tries += 1;
      }
      if (placedWords >= config.numberOfWords!) break;
    }
    feedbackBoard = fillFeedbackBoardEmptyCells(structuredClone(board));
    board = fillEmptyCells(board);
    return board;
  }

  function getFeedbackBoard(): string[][] {
    return feedbackBoard;
  }

  function getFeedbacks(): IFeedback[] {
    return feedbacks;
  }

  function getBoardSize(): { columns: number; rows: number } {
    return defaultConfiguration.boardSize!;
  }

  return {
    getBoard: populateBoard,
    getFeedbacks,
    getBoardSize,
    getFeedbackBoard,
  };
}

export default SearchWordsGame;
