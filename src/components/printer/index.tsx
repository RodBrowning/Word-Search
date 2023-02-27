import './style.scss';
import './style-mobile.scss';

import React, { useEffect, useRef, useState } from 'react';

import Board from '../board';
import FeedbackBoard from '../feedbackBoard';
import IFeedback from '../../types/feedback';
import PrinterConfigPanel from './configPanel';
import WordList from '../feedbackWordList';
import { useReactToPrint } from 'react-to-print';

const Printer: React.FC = () => {
  // States
  const [printFeedbacks, setPrintFeedbacks] = useState(false);
  const [showAllBoards, setShowAllBoards] = useState(false);
  const [triggerPrinter, setTriggerPrinter] = useState(false);
  const [boardsToPrintArray, setBoardsToPrintArray] = useState<
    { board: string[][]; feedbacks: IFeedback[]; feedbackBoard: string[][] }[]
  >([]);

  // References
  const componentRef = useRef<HTMLDivElement>(null);

  // Functions
  const handlePrint = () => {
    setShowAllBoards(true);
    setTriggerPrinter(true);
  };

  const callPrinter = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setTriggerPrinter(false),
  });

  // Effects
  useEffect(() => {
    setShowAllBoards(false);
  }, [boardsToPrintArray]);

  useEffect(() => {
    if (triggerPrinter) {
      callPrinter();
    }
  }, [triggerPrinter]);

  return (
    <div className="printer-component" ref={componentRef}>
      <PrinterConfigPanel
        handlePrint={handlePrint}
        setBoardsToPrintArray={setBoardsToPrintArray}
        setPrintFeedbacks={setPrintFeedbacks}
        setShowAllBoards={setShowAllBoards}
      />
      <div className="boards-to-print">
        {/* First board */}
        {boardsToPrintArray.length > 0 ? (
          <>
            <div className="print-board no-split page-break">
              <WordList feedbacks={boardsToPrintArray[0].feedbacks} />
              <div className="board-container">
                <Board board={boardsToPrintArray[0].board} />
              </div>
            </div>
            {/* .feedback-board is generating unique key prop error */}
            <div className={`feedback-board page-break ${printFeedbacks ? 'include-feedback' : ''}`}>
              <FeedbackBoard board={boardsToPrintArray[0].feedbackBoard} />
            </div>
          </>
        ) : (
          ''
        )}

        {/* Only if more than one board */}
        {showAllBoards
          ? boardsToPrintArray.map((newBoard, i) => {
              if (i === 0) return;
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
                    key={JSON.stringify(newBoard.feedbackBoard)}
                  >
                    <FeedbackBoard board={newBoard.feedbackBoard} />
                  </div>
                </>
              );
            })
          : ''}

        {!showAllBoards && boardsToPrintArray.length > 1 ? (
          <div className="show-all-boards">
            <button className="load-more" onClick={() => setShowAllBoards(true)}>
              Mostrar mais
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Printer;
