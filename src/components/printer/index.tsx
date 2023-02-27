import './style.scss';
import './style-mobile.scss';

import React, { useRef, useState } from 'react';

import Board from '../board';
import FeedbackBoard from '../feedbackBoard';
import IFeedback from '../../types/feedback';
import PrinterConfigPanel from './configPanel';
import WordList from '../feedbackWordList';
import { useReactToPrint } from 'react-to-print';

const Printer: React.FC = () => {
  const [printFeedbacks, setPrintFeedbacks] = useState(false);
  const [boardsToPrintArray, setBoardsToPrintArray] = useState<
    { board: string[][]; feedbacks: IFeedback[]; feedbackBoard: string[][] }[]
  >([]);

  // References
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="printer-component" ref={componentRef}>
      <PrinterConfigPanel
        handlePrint={handlePrint}
        setBoardsToPrintArray={setBoardsToPrintArray}
        setPrintFeedbacks={setPrintFeedbacks}
      />
      <div className="boards-to-print">
        {boardsToPrintArray.map((newBoard, i) => {
          return (
            <>
              <div className="print-board no-split page-break" key={JSON.stringify(newBoard.feedbacks)}>
                <WordList feedbacks={newBoard.feedbacks} />
                <div className="board-container">
                  <Board board={newBoard.board} />
                </div>
              </div>
              {/* .feedback-board is generating unique key prop error */}
              <div
                className={`feedback-board page-break ${printFeedbacks ? 'include-feedback' : ''}`}
                key={'f' + i + JSON.stringify(newBoard.feedbacks)}
              >
                <FeedbackBoard board={newBoard.feedbackBoard} />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Printer;
