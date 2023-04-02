import './style.scss';

import Board from '../board';
// eslint-disable-next-line import/order
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
