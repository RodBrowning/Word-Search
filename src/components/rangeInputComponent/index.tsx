import './style.scss';
import './style-mobile.scss';

import React, { useLayoutEffect, useState } from 'react';

interface Props {
  name: string;
  labelText: string;
  min: number;
  max: number;
  defaultValue: number;
  // eslint-disable-next-line no-unused-vars
  setInputValue: (value: number) => void;
}

const getPercentage = (max: number, min: number, currentValue: number) => {
  const totalRange = Number(max) - Number(min);
  const currentPosition = Number(currentValue) - Number(min);
  return (currentPosition / totalRange) * 100;
};

const RangeInputComponent: React.FC<Props> = ({ name, labelText, min, max, defaultValue, setInputValue }) => {
  const [percentage, setPercentage] = useState(getPercentage(max, min, defaultValue));
  const [valueToDisplay, setValueToDisplay] = useState(defaultValue);

  const setParameters = (min: number, max: number, defaultValue: number) => {
    setPercentage(getPercentage(Number(max), Number(min), Number(defaultValue)));
    setValueToDisplay(Number(defaultValue));
    setInputValue(Number(defaultValue));
  };

  const handleChange = (target: HTMLInputElement) => {
    setParameters(Number(target.min), Number(target.max), Number(target.value));
  };

  useLayoutEffect(() => {
    setParameters(min, max, defaultValue);
  }, [defaultValue]);

  return (
    <div className="input-range-container">
      <label htmlFor={name}>
        <h5>
          {labelText}
          <span style={{ float: 'right' }}>
            {valueToDisplay}/{max}
          </span>
        </h5>
        <div className="input-range">
          <input
            type="range"
            onChange={(e) => {
              return handleChange(e.target);
            }}
            style={{ backgroundSize: `${percentage}% 100%` }}
            value={defaultValue}
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
