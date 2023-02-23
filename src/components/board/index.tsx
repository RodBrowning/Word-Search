import './style.scss';
import './style-mobile.scss';

import React from 'react';

interface Props {
  board: string[][];
}

const Board: React.FC<Props> = ({ board }) => {
  return (
    <div className="board">
      <table>
        <tbody>
          {board.map((row: string[], i: number) => {
            return (
              <tr key={`row-${i}`}>
                {row.map((cell: string, j: number) => {
                  return (
                    <td key={`cell-${j}`}>
                      <h6>{cell}</h6>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Board;
