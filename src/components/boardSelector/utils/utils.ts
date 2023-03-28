const calculateHypotenuse = (sideA: number, sideB: number) => {
  const hypotenuse = Math.sqrt(sideA * sideA + sideB * sideB);
  return hypotenuse;
};

const getDirection = (position: {
  initialRow: number;
  finalRow: number;
  initialColumn: number;
  finalColumn: number;
}) => {
  const { initialRow, finalRow, initialColumn, finalColumn } = position;
  const selectionOutOfLineLimit = 1;
  const diagonalSelectionOutOfLineLimit =
    Math.abs(
      Math.abs(Math.floor(initialColumn) - Math.floor(finalColumn)) -
        Math.abs(Math.floor(initialRow) - Math.floor(finalRow))
    ) <= 2;

  if (
    (initialRow > Math.floor(finalRow) && initialColumn < Math.floor(finalColumn) && diagonalSelectionOutOfLineLimit) ||
    (Math.ceil(initialRow - finalRow) === 1 && Math.ceil(initialColumn - finalColumn) === -1)
  ) {
    return 'upRight';
  }
  if (
    (initialRow > Math.floor(finalRow) && initialColumn > Math.floor(finalColumn) && diagonalSelectionOutOfLineLimit) ||
    (Math.ceil(initialRow - finalRow) === 1 && Math.ceil(initialColumn - finalColumn) === 1)
  ) {
    return 'upLeft';
  }
  if (
    (initialRow < Math.floor(finalRow) && initialColumn < Math.floor(finalColumn) && diagonalSelectionOutOfLineLimit) ||
    (Math.ceil(initialRow - finalRow) === -1 && Math.ceil(initialColumn - finalColumn) === -1)
  ) {
    return 'downRight';
  }
  if (
    (initialRow < Math.floor(finalRow) && initialColumn > Math.floor(finalColumn) && diagonalSelectionOutOfLineLimit) ||
    (Math.ceil(initialRow - finalRow) === -1 && Math.ceil(initialColumn - finalColumn) === 1)
  ) {
    return 'downLeft';
  }
  if (
    initialRow === Math.floor(finalRow) ||
    (Math.floor(finalRow) <= initialRow + selectionOutOfLineLimit &&
      Math.floor(finalRow) >= initialRow - selectionOutOfLineLimit)
  ) {
    if (initialColumn < Math.floor(finalColumn)) {
      return 'horizontal';
    }
    if (initialColumn > Math.floor(finalColumn)) {
      return 'horizontalReverse';
    }
  }
  if (
    initialColumn === Math.floor(finalColumn) ||
    (initialColumn + selectionOutOfLineLimit >= Math.floor(finalColumn) &&
      initialColumn - selectionOutOfLineLimit <= Math.floor(finalColumn))
  ) {
    if (initialRow < Math.floor(finalRow)) {
      return 'vertical';
    }
    if (initialRow > Math.floor(finalRow)) {
      return 'verticalReverse';
    }
  }
  return undefined;
};

const getWordLength = (position: {
  initialRow: number;
  finalRow: number;
  initialColumn: number;
  finalColumn: number;
}) => {
  const { initialRow, finalRow, initialColumn, finalColumn } = position;
  const direction = getDirection(position);
  const width = Math.abs(Math.abs(initialColumn) - Math.abs(finalColumn)) + 1;
  const height = Math.abs(Math.abs(initialRow) - Math.abs(finalRow)) + 1;
  let wordLength = 0;

  switch (direction) {
    case 'upRight':
      if (width > height) {
        wordLength = width;
      } else {
        wordLength = height;
      }
      break;
    case 'upLeft':
      if (width > height) {
        wordLength = width + 1;
      } else {
        wordLength = height + 1;
      }
      break;
    case 'downRight':
      if (width > height) {
        wordLength = width;
      } else {
        wordLength = height;
      }
      break;
    case 'downLeft':
      if (width > height) {
        wordLength = width + 1;
      } else {
        wordLength = height;
      }
      break;
    case 'horizontal':
      wordLength = width;
      break;
    case 'horizontalReverse':
      wordLength = width + 1;
      break;
    case 'vertical':
      wordLength = height;
      break;
    case 'verticalReverse':
      wordLength = height + 1;
      break;

    default:
      wordLength = 0;
      break;
  }
  return wordLength;
};

export { calculateHypotenuse, getDirection, getWordLength };
