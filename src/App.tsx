import './scss/fonts/Lato/stylesheet.scss';
import './scss/fonts/WorkSans/stylesheet.scss';
import './App.scss';
import './App-mobile.scss';

import Footer from './components/footer';
import Header from './components/header';
import Panel from './components/panel';
import React from 'react';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Panel />
      <Footer />
    </div>
  );
};

export default App;
