/* eslint-disable no-underscore-dangle */

import { Layer, Stage } from 'react-konva';
import React, { useLayoutEffect, useState } from 'react';
import { getDirection, getWordLength } from '../utils/utils';

import IFeedback from '../../../types/feedback';
import Selector from '../selectors/selector';
import colors from './colors';
import useSessionStorage from '../../../utils/customHooks/useSessionStorage';

interface Props {
  feedbacks: IFeedback[];
  columnWidth: number;
  rowHeight: number;
  stageWidth: number;
  stageHeight: number;
  handleFoundWord: (word: string, color: string) => void;
}

const SelectorStage: React.FC<Props> = ({
  feedbacks,
  columnWidth,
  rowHeight,
  stageWidth,
  stageHeight,
  handleFoundWord,
}) => {
  const [notFoundWordskMap, setNotFoundWordskMap] = useState<Map<string, { word: string; found: boolean }>>();
  const [selector, setSelector] = useState<React.ReactElement>();

  const [colorIndex, setNewColorIndex] = useSessionStorage('colorIndex', 0);

  const changeColorIndex = () => {
    if (colorIndex + 1 === colors.length) {
      setNewColorIndex(0);
    } else {
      setNewColorIndex(colorIndex + 1);
    }
  };
  const getColor = () => {
    const color = colors[colorIndex];
    return color;
  };

  const getFeedbackString = (position: {
    initialColumn: number;
    initialRow: number;
    finalColumn: number;
    finalRow: number;
  }) => {
    const { initialRow, initialColumn } = position;
    const direction = getDirection(position);
    const wordLength = getWordLength(position);
    const firstChar = 1;
    const remaningLetters = Math.round(wordLength) - firstChar;

    let feedbackCode;

    switch (direction) {
      case 'vertical':
        feedbackCode = `r${initialRow}-c${initialColumn}_r${initialRow + remaningLetters}-c${initialColumn}`;
        break;
      case 'verticalReverse':
        feedbackCode = `r${initialRow - remaningLetters}-c${initialColumn}_r${initialRow}-c${initialColumn}`;
        break;
      case 'upRight':
        feedbackCode = `r${initialRow}-c${initialColumn}_r${initialRow - remaningLetters}-c${
          initialColumn + remaningLetters
        }`;
        break;
      case 'upLeft':
        feedbackCode = `r${initialRow - remaningLetters}-c${
          initialColumn - remaningLetters
        }_r${initialRow}-c${initialColumn}`;
        break;
      case 'downRight':
        feedbackCode = `r${initialRow}-c${initialColumn}_r${initialRow + remaningLetters}-c${
          initialColumn + remaningLetters
        }`;
        break;
      case 'downLeft':
        feedbackCode = `r${initialRow + remaningLetters}-c${
          initialColumn - remaningLetters
        }_r${initialRow}-c${initialColumn}`;
        break;
      case 'horizontalReverse':
        feedbackCode = `r${initialRow}-c${initialColumn - remaningLetters}_r${initialRow}-c${initialColumn}`;
        break;
      default:
        feedbackCode = `r${initialRow}-c${initialColumn}_r${initialRow}-c${initialColumn + remaningLetters}`;
        break;
    }
    return feedbackCode;
  };

  const getFeedbacksMap = (feedbacks: IFeedback[]) => {
    const feedbacksMap = new Map<string, { word: string; found: boolean }>();
    feedbacks.forEach((feedback) => {
      if (feedback.found) return;
      const feedbackString = getFeedbackString({
        initialColumn: feedback.position.initial.column,
        initialRow: feedback.position.initial.row,
        finalColumn: feedback.position.final.column,
        finalRow: feedback.position.final.row,
      });

      feedbacksMap.set(feedbackString, { word: feedback.word, found: feedback.found });
    });
    return feedbacksMap;
  };

  const checkIfTheWordWasFound = (
    position: {
      initialColumn: number;
      initialRow: number;
      finalColumn: number;
      finalRow: number;
    },
    color: string
  ) => {
    const feedbackCode = getFeedbackString(position);

    const foundWord = notFoundWordskMap!.has(feedbackCode);
    if (foundWord) {
      const { word } = notFoundWordskMap!.get(feedbackCode)!;
      handleFoundWord(word, color);
      notFoundWordskMap?.delete(feedbackCode);
      setNotFoundWordskMap(notFoundWordskMap);
    }
    setSelector(undefined);
    changeColorIndex();
  };

  const handleMouseUpEvent = (
    upEvent: React.BaseSyntheticEvent,
    initialColumn: number,
    initialRow: number,
    color: string
  ) => {
    let { target } = upEvent;
    if (target !== upEvent.currentTarget) {
      target = target.parent.parent;
    }

    const finalColumn = target._changedPointerPositions[0].x / columnWidth;
    const finalRow = target._changedPointerPositions[0].y / rowHeight;

    if (upEvent.type === 'touchend') {
      document.documentElement.style.overflow = 'initial';
    }

    target.off('touchmove');
    target.off('touchend');
    target.off('mousemove');
    target.off('mouseup');

    return checkIfTheWordWasFound(
      {
        initialColumn,
        initialRow,
        finalColumn,
        finalRow,
      },
      color
    );
  };

  const handleOnMouseMoveEvent = (
    moveEvent: React.BaseSyntheticEvent,
    initialColumn: number,
    initialRow: number,
    color: string
  ) => {
    let { target } = moveEvent;
    if (target !== moveEvent.currentTarget) {
      target = moveEvent.target.parent.parent;
    }

    const finalColumn = target._changedPointerPositions[0].x / columnWidth;
    const finalRow = target._changedPointerPositions[0].y / rowHeight;

    const selector = (
      <Selector
        columnWidth={columnWidth}
        rowHeight={rowHeight}
        color={color}
        position={{
          initialRow,
          finalRow,
          initialColumn,
          finalColumn,
        }}
      />
    );
    setSelector(selector);
  };

  const handleOnMouseDownEvent = (downEvent: React.BaseSyntheticEvent) => {
    if (downEvent.type === 'touchstart') {
      document.documentElement.style.overflow = 'hidden';
    }

    let { target } = downEvent;
    if (target !== downEvent.currentTarget) {
      target = downEvent.target.parent.parent;
    }
    const initialColumn = Math.floor(target._changedPointerPositions[0].x / columnWidth);
    const initialRow = Math.floor(target._changedPointerPositions[0].y / rowHeight);
    const color = getColor();

    target.on('touchmove', (moveEvent: React.BaseSyntheticEvent) => {
      return handleOnMouseMoveEvent(moveEvent, initialColumn, initialRow, color);
    });
    target.on('mousemove', (moveEvent: React.BaseSyntheticEvent) => {
      return handleOnMouseMoveEvent(moveEvent, initialColumn, initialRow, color);
    });

    target.on('touchend', (upEvent: React.BaseSyntheticEvent) => {
      handleMouseUpEvent(upEvent, initialColumn, initialRow, color);
    });
    target.on('mouseup', (upEvent: React.BaseSyntheticEvent) => {
      handleMouseUpEvent(upEvent, initialColumn, initialRow, color);
    });

    target.on('mouseleave', () => {
      target.off('touchmove');
      target.off('touchend');
      target.off('mousemove');
      target.off('mouseup');
      setSelector(undefined);
      changeColorIndex();
    });
  };

  useLayoutEffect(() => {
    const notFoundWords =
      feedbacks.length > 0
        ? feedbacks.filter((feedback) => {
            return !feedback.found;
          })
        : [];
    const notFoundWordskMap = getFeedbacksMap(notFoundWords);

    setNotFoundWordskMap(notFoundWordskMap);
  }, [feedbacks]);

  return (
    <Stage
      ontouchstart={handleOnMouseDownEvent}
      onmousedown={handleOnMouseDownEvent}
      id="konva-stage"
      width={stageWidth}
      height={stageHeight}
    >
      <Layer>{selector}</Layer>
    </Stage>
  );
};

export default SelectorStage;
