import { Layer, Stage } from 'react-konva';

import IFeedback from '../../../types/feedback';
// eslint-disable-next-line import/order
import React from 'react';
import Selector from '../selectors/selector';

interface Props {
  feedbacks: IFeedback[];
  columnWidth: number;
  rowHeight: number;
  stageWidth: number;
  stageHeight: number;
}

const FoundWordsStage: React.FC<Props> = ({ feedbacks, columnWidth, rowHeight, stageWidth, stageHeight }) => {
  return (
    <Stage width={stageWidth} height={stageHeight}>
      <Layer>
        {feedbacks.map((feedback) => {
          return (
            <Selector
              columnWidth={columnWidth}
              rowHeight={rowHeight}
              color={feedback.color!}
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
