import './style.scss';

import Board from '../board';
import React from 'react';

interface Props {
  board: string[][];
}

const FeedbackBoard: React.FC<Props> = ({ board }) => {
  return (
    <div id="feedback-board">
      <Board board={board} />
    </div>
  );
};

export default FeedbackBoard;
