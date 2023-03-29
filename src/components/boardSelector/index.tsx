import './style.scss';

import React, { ReactNode, useEffect, useRef, useState } from 'react';

import FoundWordsStage from './foundWordsLayer';
import IFeedback from '../../types/feedback';
import SelectorStage from './selectorLayer';
import { processWord } from '../../features/game/gameSlice';
import { useDispatch } from 'react-redux';

interface Props {
  board: string[][];
  feedbacks: IFeedback[];
  children: ReactNode;
}

type mainParamentersType = {
  stageHeight: number;
  stageWidth: number;
  numOfRows: number;
  numOfColumns: number;
  rowHeight: number;
  columnWidth: number;
};

const BoardSelector: React.FC<Props> = ({ board, feedbacks, children }) => {
  const boardWrapperRef = useRef<HTMLDivElement>(null);
  const [mainParamenters, setMainParamenters] = useState<mainParamentersType>({
    stageHeight: 1,
    stageWidth: 1,
    numOfRows: 0,
    numOfColumns: 0,
    rowHeight: 0,
    columnWidth: 0,
  });
  const dispatch = useDispatch();

  const getMainParameters = (wrapperDiv: HTMLDivElement) => {
    const tBody = wrapperDiv.getElementsByTagName('tbody')[0];
    const stageHeight = tBody.clientHeight;
    const stageWidth = tBody.clientWidth;
    const numOfRows = board.length;
    const numOfColumns = board[0]?.length;
    const rowHeight = stageHeight / numOfRows;
    const columnWidth = stageWidth / numOfColumns;

    return {
      stageHeight,
      stageWidth,
      numOfRows,
      numOfColumns,
      rowHeight,
      columnWidth,
    };
  };

  const computeMainParameters = () => {
    const mainParams = getMainParameters(boardWrapperRef.current!);
    setMainParamenters(mainParams);
  };

  // Effects
  useEffect(() => {
    computeMainParameters();

    window.addEventListener('resize', computeMainParameters);
    return () => {
      window.removeEventListener('resize', computeMainParameters);
    };
  }, [board]);

  return (
    <div id="board-selection-wrapper" ref={boardWrapperRef}>
      <div
        id="konva-stage"
        className="konva-stage-t"
        style={{ width: `${mainParamenters.stageWidth}px`, height: `${mainParamenters.stageHeight}px` }}
      >
        <FoundWordsStage
          feedbacks={feedbacks.filter((feedback) => {
            return feedback.found;
          })}
          columnWidth={mainParamenters.columnWidth}
          rowHeight={mainParamenters.rowHeight}
          stageWidth={mainParamenters.stageWidth}
          stageHeight={mainParamenters.stageHeight}
        />
        <SelectorStage
          feedbacks={feedbacks.filter((feedback) => {
            return !feedback.found;
          })}
          columnWidth={mainParamenters.columnWidth}
          rowHeight={mainParamenters.rowHeight}
          stageWidth={mainParamenters.stageWidth}
          stageHeight={mainParamenters.stageHeight}
          handleFoundWord={(word: string, color: string) => {
            return dispatch(processWord({ word, color }));
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default BoardSelector;
