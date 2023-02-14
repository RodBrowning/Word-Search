import './style.scss';
import './style-mobile.scss';

import React, { useState } from 'react';

interface Props {
  name: string;
  labelText: string;
  min: number;
  max: number;
  defaultValue: number;
}

const getPercentage = (max: number, min: number, currentValue: number) => {
  const totalRange = Number(max) - Number(min);
  const currentPosition = Number(currentValue) - Number(min);
  return (currentPosition / totalRange) * 100;
};

const RangeInputComponent: React.FC<Props> = ({ name, labelText, min, max, defaultValue }) => {
  const [percentage, setPercentage] = useState(getPercentage(max, min, defaultValue));
  const [valueToDisplay, setValueToDisplay] = useState(defaultValue);

  const handleChange = (target: HTMLInputElement) => {
    setPercentage(getPercentage(Number(target.max), Number(target.min), Number(target.value)));
    setValueToDisplay(Number(target.value));
  };

  return (
    <div className="input-range-container">
      <label htmlFor={name}>
        <h5>
          {labelText}
          <span style={{ float: 'right' }}>{valueToDisplay}</span>
        </h5>
        <div className="input-range">
          <input
            type="range"
            onChange={(e) => handleChange(e.target)}
            style={{ backgroundSize: `${percentage}% 100%` }}
            defaultValue={defaultValue}
            min={min}
            max={max}
            step={1}
            name={name}
          />
        </div>
      </label>
    </div>
  );
};

export default RangeInputComponent;
