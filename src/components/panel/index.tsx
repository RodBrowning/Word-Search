import './style.scss';
import './style-mobile.scss';

import About from '../about';
import Contact from '../contact';
import Game from '../game';
// eslint-disable-next-line import/order
import React from 'react';

const Panel: React.FC = () => {
  return (
    <div className="panel">
      <div className="bg-decoration">
        <div className="inner-bg-decoration" />
      </div>
      <Game />
      <Contact />
      <About />
    </div>
  );
};

export default Panel;
