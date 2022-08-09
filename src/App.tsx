import './App.scss';
import './App-mobile.scss';

import Footer from './components/footer';
import Header from './components/header';
import Panel from './components/panel';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Panel />
      <Footer />
    </div>
  );
};

export default App;
