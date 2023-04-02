import './style.scss';
import './style-mobile.scss';

import IFeedback from '../../types/feedback';
// eslint-disable-next-line import/order
import React from 'react';

interface Props {
  feedbacks: IFeedback[];
}

const WordList: React.FC<Props> = ({ feedbacks }) => {
  return (
    <div className="word-list">
      <ul className={feedbacks.length > 12 ? 'split' : ''}>
        {feedbacks.map((feedback) => {
          return (
            <li key={feedback.word}>
              <span className={feedback.found ? 'found' : ''}>
                <h5>{feedback.word}</h5>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WordList;
