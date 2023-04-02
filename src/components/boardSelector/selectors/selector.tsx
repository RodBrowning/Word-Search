// eslint-disable-next-line import/order
import { calculateHypotenuse, getDirection, getWordLength } from '../utils/utils';

import React from 'react';
import { Rect } from 'react-konva';

interface Props {
  columnWidth: number;
  rowHeight: number;
  color: string;
  position: { initialRow: number; initialColumn: number; finalRow: number; finalColumn: number };
}

const getDegreesRadians = (width: number, height: number) => {
  const angleRad = Math.atan(height / width);
  return angleRad;
  // const angleDegree = angleRad * (180 / Math.PI);
};

const Selector: React.FC<Props> = ({ columnWidth, rowHeight, color, position }) => {
  const selectorWidth = 20;
  const opacity = 0.7;
  const posX = position.initialColumn;
  const posY = position.initialRow;
  const direction = getDirection(position);
  let width;
  let height;
  let xPosition;
  let yPosition;
  let offset;

  const numberOfLetters = getWordLength(position);
  const isReverse = direction === 'verticalReverse' || direction === 'horizontalReverse';

  switch (direction) {
    case 'upRight':
    case 'upLeft':
    case 'downRight':
    case 'downLeft':
      width =
        calculateHypotenuse(columnWidth * numberOfLetters, rowHeight * numberOfLetters) - (rowHeight - selectorWidth);
      height = selectorWidth;
      xPosition = columnWidth * posX;
      yPosition = rowHeight * posY + (rowHeight - selectorWidth) / 2;
      offset = { x: 0, y: 0 };
      break;
    case 'vertical':
    case 'verticalReverse':
      width = selectorWidth;
      height = rowHeight * numberOfLetters - (rowHeight - selectorWidth);
      xPosition = columnWidth * posX + (columnWidth - selectorWidth) / 2;
      yPosition = rowHeight * posY + (rowHeight - selectorWidth) / 2;
      offset = isReverse ? { x: columnWidth - selectorWidth, y: 0 } : { x: 0, y: 0 };
      break;
    case 'horizontal':
    case 'horizontalReverse':
      width = columnWidth * numberOfLetters - (columnWidth - selectorWidth);
      height = selectorWidth;
      xPosition = columnWidth * posX + (columnWidth - selectorWidth) / 2;
      yPosition = rowHeight * posY + (rowHeight - selectorWidth) / 2;
      offset = isReverse ? { x: rowHeight - selectorWidth, y: 0 } : { x: 0, y: 0 };
      break;

    case undefined:
      width = columnWidth * 1 - (columnWidth - selectorWidth);
      height = rowHeight * 1 - (rowHeight - selectorWidth);
      xPosition = columnWidth * posX + (columnWidth - selectorWidth) / 2;
      yPosition = rowHeight * posY + (rowHeight - selectorWidth) / 2;
      offset = { x: 0, y: 0 };
      break;

    default:
      break;
  }

  return (
    <Rect
      x={xPosition}
      y={yPosition}
      width={width}
      height={height}
      fill={color}
      opacity={opacity}
      offset={offset}
      sceneFunc={(ctx, shape) => {
        ctx.translate(columnWidth / 2, selectorWidth / 2);
        let angleRadians = getDegreesRadians(columnWidth, rowHeight);
        if (direction === 'upRight') angleRadians = -angleRadians;
        if (direction === 'upLeft') angleRadians += Math.PI;
        if (direction === 'downLeft') angleRadians = -angleRadians + Math.PI;
        if (direction === 'horizontal' || direction === 'vertical' || direction === undefined)
          angleRadians -= angleRadians;
        if (direction === 'horizontalReverse' || direction === 'verticalReverse') angleRadians = Math.PI;

        ctx.rotate(angleRadians);
        ctx.rect(-columnWidth / 2, -selectorWidth / 2, shape.getAttr('width'), shape.getAttr('height'));

        const x = -columnWidth / 2;
        const y = -rowHeight / 2 + (rowHeight - selectorWidth) / 2;
        const width = shape.getAttr('width');
        const height = shape.getAttr('height');
        const radius = 6;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fillStrokeShape(shape);
      }}
    />
  );
};

export default Selector;
