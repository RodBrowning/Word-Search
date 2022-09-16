import './style.scss';
import './style-mobile.scss';

import React from 'react';

interface Props {
  name: string;
  labelText: string;
  min: number;
  max: number;
  defaultValue: number;
}

const RangeInputComponent: React.FC<Props> = ({ name, labelText, min, max, defaultValue }) => {
  return (
    <div className="input-range-container">
      <label htmlFor={name}>
        <h5>
          {labelText}
          <span style={{ float: 'right' }}>10</span>
        </h5>
        <div className="input-range">
          <input type="range" defaultValue={defaultValue} min={min} max={max} step={1} name={name} />
        </div>
      </label>
    </div>
  );
};

export default RangeInputComponent;
