import './style.scss';
import './style-mobile.scss';

import IFeedback from '../../types/feedback';
// eslint-disable-next-line import/order
import React from 'react';

interface Props {
  feedbacks: IFeedback[];
  blurFeedbaks?: boolean;
}

const WordList: React.FC<Props> = ({ feedbacks, blurFeedbaks }) => {
  return (
    <div className="word-list">
      <ul className={feedbacks.length > 12 ? 'split' : ''}>
        {feedbacks.map((feedback) => {
          const classes = {
            found: feedback.found ? 'found' : '',
            blur: blurFeedbaks && !feedback.found ? 'blur-feedbacks' : '',
          };
          return (
            <li key={feedback.word}>
              <span className={`${classes.found} ${classes.blur}`}>
                <h5>{feedback.word}</h5>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

WordList.defaultProps = {
  blurFeedbaks: false,
};

export default WordList;
