import './style.scss';

import React, { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';

import FoundWordsStage from './foundWordsLayer';
import IFeedback from '../../types/feedback';
import SelectorStage from './selectorLayer';
import colors from './colors';

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
  const [foundWordsFeedbacks, setFoundWordsFeedbacks] = useState<IFeedback[]>([]);

  let colorIndex = 0;
  const changeColorIndex = () => {
    if (colorIndex + 1 === colors.length) {
      colorIndex = 0;
    } else {
      colorIndex += 1;
    }
  };
  const getColor = () => {
    const color = colors[colorIndex];
    return color;
  };

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

  // Effects
  useEffect(() => {
    const mainParams = getMainParameters(boardWrapperRef.current!);
    setMainParamenters(mainParams);
  }, [board]);

  useLayoutEffect(() => {
    const onResize = () => {
      const mainParams = getMainParameters(boardWrapperRef.current!);
      setMainParamenters(mainParams);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useLayoutEffect(() => {
    const foundWords = feedbacks.filter((feedback) => {
      return feedback.found;
    });
    setFoundWordsFeedbacks(foundWords);
  }, [feedbacks]);

  return (
    <div id="board-selection-wrapper" ref={boardWrapperRef}>
      <div
        id="konva-stage"
        className="konva-stage-t"
        style={{ width: `${mainParamenters.stageWidth}px`, height: `${mainParamenters.stageHeight}px` }}
      >
        <FoundWordsStage
          feedbacks={foundWordsFeedbacks}
          columnWidth={mainParamenters.columnWidth}
          rowHeight={mainParamenters.rowHeight}
          stageWidth={mainParamenters.stageWidth}
          stageHeight={mainParamenters.stageHeight}
          getColor={getColor}
          changeColorIndex={changeColorIndex}
        />
        <SelectorStage
          feedbacks={feedbacks.filter((feedback) => {
            return !feedback.found;
          })}
          columnWidth={mainParamenters.columnWidth}
          rowHeight={mainParamenters.rowHeight}
          stageWidth={mainParamenters.stageWidth}
          stageHeight={mainParamenters.stageHeight}
          getColor={getColor}
          changeColorIndex={changeColorIndex}
          handleFoundWord={(word) => {
            return alert(`found ${word}`);
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default BoardSelector;
