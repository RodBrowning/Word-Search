import { Layer, Stage } from 'react-konva';

import IFeedback from '../../../types/feedback';
import React from 'react';
import Selector from '../selectors/selector';

interface Props {
  feedbacks: IFeedback[];
  columnWidth: number;
  rowHeight: number;
  stageWidth: number;
  stageHeight: number;
  getColor: () => string;
  changeColorIndex: () => void;
}

const FoundWordsStage: React.FC<Props> = ({
  feedbacks,
  columnWidth,
  rowHeight,
  stageWidth,
  stageHeight,
  getColor,
  changeColorIndex,
}) => {
  return (
    <Stage width={stageWidth} height={stageHeight}>
      <Layer>
        {feedbacks.map((feedback) => {
          const color = getColor();
          changeColorIndex();
          return (
            <Selector
              columnWidth={columnWidth}
              rowHeight={rowHeight}
              color={color}
              position={{
                initialRow: feedback.position.initial.row,
                initialColumn: feedback.position.initial.column,
                finalRow: feedback.position.final.row,
                finalColumn: feedback.position.final.column,
              }}
              key={feedback.word}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default FoundWordsStage;
