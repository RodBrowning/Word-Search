import './style.scss';

import Board from '../board';
import React from 'react';

interface Props {
  board: string[][];
}

const FeedbackBoard: React.FC<Props> = ({ board }) => {
  return (
    <div id="feedback-board">
      <h5>Gabarito</h5>
      <Board board={board} />
    </div>
  );
};

export default FeedbackBoard;
