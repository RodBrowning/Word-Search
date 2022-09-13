import './style.scss';
import './style-mobile.scss';

import Board from '../board';
// eslint-disable-next-line import/order
import React from 'react';
import SearchWordsGame from '../../utils/SearchWordGame';
import WordList from '../wordList';

const Printer: React.FC = () => {
  const gameBoard = SearchWordsGame();
  const board = gameBoard.getBoard({
    boardSize: { columns: 30, rows: 15 },
    useCustom: true,
    customWords: ['caça', 'palavras', 'criança', 'aprender', 'memoria', 'futuro', 'sorte', 'santos'],
  });
  const feedbacks = gameBoard.getFeedbacks();
  return (
    // Printer menu
    <div className="boards-to-print">
      <div className="print-board">
        <WordList feedbacks={feedbacks} />
        <div className="board-container">
          <Board board={board} />
        </div>
      </div>
      <div className="print-board">
        <WordList feedbacks={feedbacks} />
        <div className="board-container">
          <Board board={board} />
        </div>
      </div>
      <div className="print-board">
        <WordList feedbacks={feedbacks} />
        <div className="board-container">
          <Board board={board} />
        </div>
      </div>
    </div>
  );
};

export default Printer;
