import './style.scss';
import './style-mobile.scss';

import { Route, Routes } from 'react-router-dom';

import About from '../about';
import Contact from '../contact';
import Game from '../game';
import Printer from '../printer';
// eslint-disable-next-line import/order
import React from 'react';

const Panel: React.FC = () => {
  return (
    <div className="panel">
      <div className="bg-decoration">
        <div className="inner-bg-decoration" />
      </div>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="contato" element={<Contact />} />
        <Route path="sobre" element={<About />} />
        <Route path="imprimir" element={<Printer />} />
      </Routes>
    </div>
  );
};

export default Panel;
